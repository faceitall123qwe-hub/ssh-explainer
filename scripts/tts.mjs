import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, renameSync, rmSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const VOICE = "ru-RU-DmitryNeural";
const RATE = "+8%";

// Spoken text; tech terms spelled phonetically so the voice reads them naturally.
const lines = [
  "Сервер стоит в дата-центре за тысячу километров. Как управлять им так, будто сидишь рядом? С помощью эс-эс-эйч.",
  "Эс-эс-эйч это защищённая удалённая консоль. Ты вводишь команды у себя, а выполняются они на сервере. Весь трафик зашифрован.",
  "Подключение одной командой: эс-эс-эйч, имя пользователя, собака и адрес сервера. По умолчанию используется порт двадцать два.",
  "При первом подключении сервер показывает свой отпечаток. Ты подтверждаешь его, и компьютер запоминает сервер, чтобы в следующий раз заметить подмену.",
  "Можно войти по паролю, но это слабое место: пароль можно подобрать или украсть. Боты перебирают пароли на серверах круглые сутки.",
  "Лучше вход по ключам. Команда эс-эс-эйч кейген создаёт пару: приватный ключ остаётся у тебя, а публичный ты копируешь на сервер.",
  "При входе сервер даёт задачу, которую можно решить только приватным ключом. Ты её решаешь, и сервер тебя пускает. Сам ключ по сети не передаётся.",
  "Через эс-эс-эйч можно и копировать файлы. Команда эс-си-пи отправляет файл на сервер так же просто, как обычное копирование.",
  "А ещё эс-эс-эйч умеет строить туннели. Например, безопасно пробросить порт базы данных с сервера к себе на компьютер.",
  "Удалённая консоль, шифрование, ключи вместо паролей и туннели. Так работает эс-эс-эйч. Попробуй сам: в терминале набери эс-эс-эйч кейген."
];

const only = process.argv[2] ? Number(process.argv[2]) : null;
const outRoot = "assets/audio";
mkdirSync(outRoot, { recursive: true });

for (let i = 0; i < lines.length; i++) {
  const n = String(i + 1).padStart(2, "0");
  if (only && only !== i + 1) continue;
  const tmp = join(outRoot, `tmp-${n}`);
  rmSync(tmp, { recursive: true, force: true });
  mkdirSync(tmp, { recursive: true });
  const tts = new MsEdgeTTS();
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3, {
    wordBoundaryEnabled: true,
  });
  await tts.toFile(tmp, lines[i], { rate: RATE });
  tts.close();
  for (const f of readdirSync(tmp)) {
    const ext = f.endsWith(".mp3") ? "mp3" : "json";
    renameSync(join(tmp, f), join(outRoot, `vo-${n}.${ext}`));
  }
  rmSync(tmp, { recursive: true, force: true });
  console.log(`vo-${n} ok`, existsSync(join(outRoot, `vo-${n}.mp3`)));
}
