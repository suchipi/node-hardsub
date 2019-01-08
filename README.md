# hardsub

A command-line script for hardsubbing MKVs with ffmpeg. Includes a copy of ffmpeg; you don't need to install one.

## Installation

```
npm install -g hardsub
```

## Usage

```
hardsub file.mkv output.mp4
```

## Additional options

- `--subtitle-track`: Specify which subtitle track to use, by index. Defaults to `0`.
- `--audio-track`: Specify which audio track to use, by index. Defaults to `0`.
- `--video-track`: Specify which video track to use, by index. Defaults to `0`.

## License

MIT
