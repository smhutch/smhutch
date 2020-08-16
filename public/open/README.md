# Open images

Images sourced from [Unsplash](https://unsplash.com/).

## Preparing images

1. Download from Unsplash, noting photographer name and photo id.
2. Optimize assets
```sh
# Resize square assets
convert source.jpg -resize 1000x1000 out.jpg

# For non-square assets, crop and resize.
convert source.jpg -resize "1000^>" -gravity center -crop 1000x1000+0+0 -strip test.jpg
```
