magick mogrify \
    -resize "2000^>" \
    -gravity center \
    -crop 2000x2000+0+0 \
    -strip \
    -path ./inbox/out \
    "./inbox/open-images/*.jpg"