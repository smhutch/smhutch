/**
 * Reference: https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/math.md
 */
declare module 'canvas-sketch-util/math' {
  /**
   * linearly interpolate between min and max.
   * Parameter p is a value within the range of 0..1
   * */
  function lerp(min: number, max: number, p: number): number
}
