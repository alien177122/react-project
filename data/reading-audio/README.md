# Reading-article audio (local)

Source: [Что анаболики делают с сосудами?](https://www.youtube.com/watch?v=2kKssc-FqzY) — канал «Дневник врача Егорова», 29:46.

| Файл                 | Формат                                       |
| -------------------- | -------------------------------------------- |
| `2kKssc-FqzY.m4a`    | AAC со источника                             |
| `2kKssc-FqzY.mp3`    | 192 kb/s, 48 kHz, stereo — для прослушивания |
| `2kKssc-FqzY.ru.txt` | очищенные автосубтитры (основа конспекта)    |

Медиа в git не коммитится. Пересборка:

```sh
yt-dlp --extractor-args "youtube:player_client=tv,mweb,web_safari" -f "bestaudio/best" --extract-audio --audio-format m4a -o "2kKssc-FqzY.%(ext)s" "https://www.youtube.com/watch?v=2kKssc-FqzY"
ffmpeg -y -i 2kKssc-FqzY.m4a -vn -c:a libmp3lame -b:a 192k -ar 48000 -ac 2 2kKssc-FqzY.mp3
```
