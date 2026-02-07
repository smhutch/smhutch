import { CodeIcon, MixIcon, PersonIcon } from "@radix-ui/react-icons";
import type { Random } from "canvas-sketch-util/random";
import { link } from "css/link";
import { DOT } from "data/typography";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { css } from "system/css";
import { Container, Flex } from "system/jsx";
import { flex, stack } from "system/patterns";

import { Meta } from "components/Meta";
import type { SketchAsset, SketchFn, SketchSettings } from "types/sketches";

const CANVAS_SIZE = 600;

type Props = SketchSettings & {
  initialSeed: number;
  next?: string | null;
  prev?: string | null;
  random: Random;
};

export const Sketch: React.FC<Props> = (props) => {
  const { id, random, initialSeed, next, prev, title } = props;

  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [asset, setAsset] = useState<SketchAsset | null>(null);
  const [sketchCache, setSketchCache] = useState<Record<string, SketchFn>>({});

  useEffect(() => {
    const getSketch = async () => {
      if (sketchCache[id]) return;

      const mod = await import(`../sketches/${id}`);
      setSketchCache({
        ...sketchCache,
        [id]: mod.sketch,
      });
    };

    getSketch();
  }, [id, sketchCache]);

  useEffect(() => {
    const reseed = (seed = random.getRandomSeed()) => {
      // Re-seed the random singleton
      random.setSeed(seed);

      const nextRoute = `/sketches/${id}?seed=${seed}`;

      router.replace(nextRoute);
    };

    // Get search params from URL.
    // Next.js router won't work here because CSR query string
    // is empty on first render, which creates a race condition.
    const url = new URL(document.location.href);
    const params = new URLSearchParams(url.search);
    const urlSeed = Number(params.get("seed"));
    if (urlSeed) {
      random.setSeed(urlSeed);
      reseed(urlSeed);
    } else {
      reseed(initialSeed);
    }

    const sketch = sketchCache[id];
    if (!sketch) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.save();

    const size = CANVAS_SIZE;

    const SCALE = window.devicePixelRatio;

    canvas.width = CANVAS_SIZE * SCALE;
    canvas.height = CANVAS_SIZE * SCALE;

    ctx.scale(SCALE, SCALE);

    const clear = () => {
      setAsset(null);
      ctx.clearRect(0, 0, size, size);
    };

    const draw = () => {
      clear();
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, size, size);
      ctx.fill();
      sketch({
        expose: ({ asset }) => {
          setAsset(asset || null);
        },
        ctx,
        size,
        random,
      });

      ctx.restore();
    };

    const navigateToSketch = (id: string) => {
      router.push(`/sketches/${id}`);
    };

    draw();

    const handleKeys = (e: KeyboardEvent) => {
      if (!canvasRef.current) return;

      if (e.code === "Space") {
        e.preventDefault(); // prevents scrolling
        reseed();
      }

      if (prev && e.code === "ArrowLeft") {
        clear();
        navigateToSketch(prev);
      }

      if (next && e.code === "ArrowRight") {
        clear();
        navigateToSketch(next);
      }

      if (e.metaKey && e.code === "KeyS") {
        e.preventDefault(); // prevent browser save
        const data = canvasRef.current.toDataURL("image/png");
        const anchor = document.createElement("a");
        const seed = random.getSeed();
        anchor.setAttribute("download", `${id}-${seed}.png`);
        anchor.setAttribute("href", data);
        anchor.click();
      }
    };

    document.addEventListener("keydown", handleKeys);
    return () => {
      document.removeEventListener("keydown", handleKeys);
    };
  }, [id, sketchCache, router.asPath]);

  return (
    <>
      <Meta
        description="A generative sketch by Scott Hutcheson."
        image={`sketches/${id}/meta.png`}
        title={`${id} — ${title}`}
      />
      <main
        className={css({
          py: "24",
          backgroundColor: "gray.50",
          flexGrow: 1,
        })}
      >
        <Container>
          <div
            className={stack({
              justify: "center",
              align: "center",
              margin: "0 auto",
              gap: "8",
              position: "relative",
              maxWidth: CANVAS_SIZE,
            })}
          >
            <canvas
              ref={canvasRef}
              className={css({
                aspectRatio: "1/1",
                boxShadow: "xl",
                borderRadius: "xl",
                maxWidth: "100%",
              })}
            />
            <div
              className={css({
                width: "100%",
              })}
            >
              <div
                className={flex({
                  fontSize: "small",
                  color: "gray.600",
                  width: "100%",
                })}
              >
                <span>#{props.id}</span>
              </div>
              <div
                className={flex({
                  justify: "space-between",
                  align: "flex-end",
                })}
              >
                <h1
                  className={css({ fontSize: "5xl", fontWeight: "semibold" })}
                >
                  {title}
                </h1>
              </div>
              <hr
                className={css({
                  background: "gray.200",
                  height: "1px",
                  border: "none",
                  my: 6,
                })}
              />
              <div className={stack({ gap: 2 })}>
                <DetailsRow icon={<CodeIcon />}>
                  <Link
                    className={link({ variant: "underline" })}
                    href={`https://github.com/smhutch/smhutch/tree/main/sketches/${id}.ts`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    View code
                  </Link>
                </DetailsRow>
                <DetailsRow icon={<MixIcon />}>
                  <Flex align="center" gap={1}>
                    <span>Seed</span>
                    <span
                      className={css({
                        fontVariant: "tabular-nums",
                        fontFamily: "mono",
                        fontSize: "xs",
                      })}
                    >
                      {random.getSeed()}
                    </span>
                    <span className={css({ color: "gray.400" })}>{DOT}</span>
                    <button
                      className={link({ variant: "underline" })}
                      type="button"
                      onClick={() => {
                        router.replace(
                          `/sketches/${id}?seed=${random.getRandomSeed()}`,
                        );
                      }}
                    >
                      Re-seed
                    </button>
                  </Flex>
                </DetailsRow>
                {asset && (
                  <DetailsRow icon={<PersonIcon />}>
                    <span>
                      Photo by{" "}
                      <Link
                        className={link({
                          variant: "underline",
                        })}
                        href={`https://unsplash.com/photos/${asset.credit.id}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {asset.credit.owner}
                      </Link>
                    </span>
                  </DetailsRow>
                )}
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

const DetailsRow: React.FC<React.PropsWithChildren<{ icon: React.ReactNode }>> = (props) => {
  return (
    <div
      className={css({
        fontSize: "small",
        color: "gray.600",

        "& svg": {
          width: "13px",
          height: "13px",
        },
      })}
    >
      <Flex align="center" gap={3}>
        {props.icon}
        <span>{props.children}</span>
      </Flex>
    </div>
  );
};
