import {
  MTOR_CONCEPTS,
  MTOR_REQUEST_OPTIONS,
  MTOR_SITE_UPGRADE,
  MTOR_VIDEO_CONTEXT,
  THEORY_CONCEPTS,
  SUPPLEMENT_TIERS,
} from '../data/theory'

// ============================================================
// КОМПОНЕНТ ТЕОРИЯ — весь контент вкладки в одном месте
// Разбит на 8 секций: понятия, mTOR, tier-лист, топ-3, таблицы, сухожилия, статьи по проекту, источники
// ============================================================
export default function TheoryTab() {
  const projectArticles = [
    {
      title: 'Сначала укрепить границы: backend + frontend',
      body: 'На бэкенде первым делом стоит закрыть три уязвимые точки: ввести явную схему UserData для PUT-запросов, сделать JWT_SECRET обязательным вне dev-режима и читать JSON только через безопасный парсер с валидацией формы данных. Это убирает тихую порчу состояния, случайные крэши и ситуацию, когда прод-секрет внезапно живёт на дефолтном значении. На фронтенде следующий шаг логично сделать симметричным: вынести из App.tsx три слоя ответственности — useAuthSession, useTrainingProgram и useCalculatorState. Тогда авторизация, расчёт проги и состояние калькулятора перестанут быть спаяны в одном компоненте, а код станет проще сопровождать, расширять и тестировать.',
    },
    {
      title: 'Тестами закрывать ядро, а не косметику',
      body: 'Самый ценный код проекта здесь не в разметке, а в правилах, которые считают веса, собирают тренировочный день и сохраняют пользователя. Поэтому первым пакетом тестов имеет смысл покрыть src/utils/calc.ts, getTrainingExercises и серверные auth/user endpoints. Именно там живут формулы, ветвления и контракты данных, где регрессия реально ломает программу: неверный 1ПМ, ошибочная схема недели, потерянная авторизация или битый профиль. Такой набор даёт максимальную отдачу: быстро фиксирует поведение системы и позволяет дальше рефакторить интерфейс без страха сломать критическую логику.',
    },
  ]

  return (
    <>
      {/* ── Секция 1: базовые понятия ─────────────────────── */}
      <div className="section">
        <div className="section-header">
          <span className="section-num">01</span>
          <span className="section-title">Основы тренировки</span>
        </div>
        <div className="note-box" style={{ marginBottom: 24 }}>
          Ключевые понятия, которые лежат в основе программы. Разберись с ними — и любая схема прогрессии станет понятна.
        </div>
        <div className="theory-grid">
          {THEORY_CONCEPTS.map((c, i) => (
            <div key={i} className="theory-card">
              <div className="theory-card-title">{c.title}</div>
              <div className="theory-card-body">{c.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Секция 2: mTOR и анаболический отклик ─────────── */}
      <div className="section">
        <div className="section-header">
          <span className="section-num">02</span>
          <span className="section-title">mTOR и анаболический отклик</span>
        </div>
        <div className="note-box" style={{ marginBottom: 24 }}>
          {MTOR_VIDEO_CONTEXT}
        </div>
        <div className="note-box" style={{ marginBottom: 24 }}>
          Чтобы собрать точный поэтапный конспект именно по ролику, нужен один из трёх входов: транскрипт, аудио/видео файл или ссылка на уже скачанное видео.
        </div>
        <div className="theory-grid" style={{ marginBottom: 24 }}>
          {MTOR_REQUEST_OPTIONS.map((option, i) => (
            <div key={i} className="theory-card" style={{ borderLeft: '3px solid #ff9f40' }}>
              <div className="theory-card-title">{option.title}</div>
              <div className="theory-card-body">{option.body}</div>
            </div>
          ))}
        </div>
        <div className="theory-grid">
          {MTOR_CONCEPTS.map((concept, i) => (
            <div key={i} className="theory-card">
              <div className="theory-card-title">{concept.title}</div>
              <div className="theory-card-body">
                <strong>Определение:</strong> {concept.definition}
                {concept.pattern && (
                  <>
                    <br /><br />
                    <strong>Закономерность:</strong> {concept.pattern}
                  </>
                )}
                {concept.bullets && (
                  <ul style={{ margin: '12px 0 0', paddingLeft: 18 }}>
                    {concept.bullets.map(item => (
                      <li key={item} style={{ marginBottom: 6 }}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="note-box" style={{ marginTop: 24 }}>
          Если появится транскрипт или сам ролик, этот раздел можно расширить до формата мини-главы для сайта:
          <br />
          {MTOR_SITE_UPGRADE.map((item, i) => (
            <span key={item}>
              {i === 0 ? '· ' : ' · '}
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Секция 3: tier-лист добавок ───────────────────── */}
      <div className="section">
        <div className="section-header">
          <span className="section-num">03</span>
          <span className="section-title">Tier List добавок</span>
        </div>
        <div className="note-box" style={{ marginBottom: 24 }}>
          По материалам <strong>Evolution Yeti</strong>: пост «TIER LIST СПОРТИВНЫХ ДОБАВОК» (08.01.2026) +
          видео «БИОХАКИНГ / НЕЗАМЕНИМЫЕ ДОБАВКИ» (YouTube, 14.02.2025).
          Рейтинг: рост мышц → сила → выносливость → восстановление → здоровье.
        </div>
        <div className="tier-list">
          {SUPPLEMENT_TIERS.map(t => (
            <div key={t.tier} className="tier-row">
              <div className="tier-badge" style={{ background: t.color, color: t.textColor }}>
                {t.tier}
              </div>
              <div className="tier-content">
                <div className="tier-label" style={{ color: t.color }}>{t.label}</div>
                <div className="tier-items">
                  {t.items.map(item => (
                    <span key={item} className="tier-item">{item}</span>
                  ))}
                </div>
                <div className="tier-note">{t.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Секция 4: топ-3 рекомендации ─────────────────── */}
      <div className="section">
        <div className="section-header">
          <span className="section-num">04</span>
          <span className="section-title">Топ-3 если выбирать</span>
        </div>
        <div className="note-box" style={{ marginBottom: 24 }}>
          Если можешь позволить себе только 2–3 добавки — вот список от автора. Всё остальное даёт либо незаметный эффект, либо требует анализов.
        </div>
        <div className="theory-top3">
          <div className="theory-top3-card">
            <div className="theory-top3-num" style={{ color: '#ff6b35' }}>01</div>
            <div className="theory-top3-name">Креатин моногидрат</div>
            <div className="theory-top3-dose">3–5 г/сут (60–70 кг) · до 10 г (100+ кг)</div>
            <div className="theory-top3-desc">
              Единственная добавка с реальным доказанным приростом силы у натуральных атлетов.
              По систематическому обзору: +4 кг к жиму, +11 кг к упражнениям на ноги.
              Хорошо работает у ~40% людей. При отсутствии эффекта — попробуй гидрохлорид или цитрат.
              Загрузочная доза: до 20 г/сут в первую неделю (необязательно).
            </div>
          </div>
          <div className="theory-top3-card">
            <div className="theory-top3-num" style={{ color: '#ff9f40' }}>02</div>
            <div className="theory-top3-name">Кофеин</div>
            <div className="theory-top3-dose">~200 мг до тренировки</div>
            <div className="theory-top3-desc">
              Самая изученная добавка: 8 из 9 исследований подтвердили рост силовых показателей.
              Улучшает выносливость, концентрацию и обучение новым движениям.
              Через кофе или предтрен. <strong>Противопоказан при хронических нарушениях сна</strong> — в таком случае сон важнее.
            </div>
          </div>
          <div className="theory-top3-card">
            <div className="theory-top3-num" style={{ color: '#9e9e9e' }}>03</div>
            <div className="theory-top3-name">Магний бисглицинат</div>
            <div className="theory-top3-dose">4 капс / ~400 мг элемент. магния</div>
            <div className="theory-top3-desc">
              При интенсивных тренировках потребность в магнии на 20% выше нормы.
              Участвует в углеводном обмене, важен для восстановления мышц.
              <strong>Принимать только при подтверждённом дефиците</strong> по результатам анализов крови.
            </div>
          </div>
        </div>
      </div>

      {/* ── Секция 5: таблица %ПМ → повторения + RPE ──────── */}
      <div className="section">
        <div className="section-header">
          <span className="section-num">05</span>
          <span className="section-title">Таблица %ПМ и RPE</span>
        </div>
        <div className="note-box" style={{ marginBottom: 24 }}>
          Взаимосвязь процента от повторного максимума, количества повторений и уровня RPE.
          Используй для планирования нагрузки и оценки тяжести подхода.
        </div>
        <div className="theory-tables-wrap">
          <div className="theory-table-card">
            <div className="theory-table-title">% от 1ПМ → Повторения</div>
            <table className="pt theory-ref-table">
              <thead>
                <tr><th style={{ textAlign: 'left' }}>% ПМ</th><th>Повт</th><th>Зона</th></tr>
              </thead>
              <tbody>
                {([
                  ['100%', '1', 'Сила'],
                  ['95%', '~2', 'Сила'],
                  ['90%', '~4', 'Сила'],
                  ['85%', '~6', 'Сила'],
                  ['80%', '~8', 'Сила / Гипертрофия'],
                  ['75%', '~10', 'Гипертрофия'],
                  ['70%', '~12', 'Гипертрофия'],
                  ['67%', '~15', 'Выносливость'],
                  ['65%', '15+', 'Выносливость'],
                ] as const).map(([pct, reps, zone], i) => (
                  <tr key={i}>
                    <td className="w-kg" style={{ textAlign: 'left' }}>{pct}</td>
                    <td className="w-sr">{reps}</td>
                    <td style={{ color: zone === 'Сила' ? '#ff6b35' : zone === 'Гипертрофия' ? '#ff9f40' : zone.includes('Сила') ? '#e85a2a' : '#5ba4ff', fontSize: 11 }}>
                      {zone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="theory-table-card">
            <div className="theory-table-title">Шкала RPE</div>
            <table className="pt theory-ref-table">
              <thead>
                <tr><th style={{ textAlign: 'left' }}>RPE</th><th>Повторы в запасе</th><th>Описание</th></tr>
              </thead>
              <tbody>
                {([
                  ['10', '0', 'Полный отказ — больше ни одного повт'],
                  ['9.5', '0–1', 'Возможно ещё 1, но не уверен'],
                  ['9', '1', 'Мог бы сделать ещё 1 повт'],
                  ['8', '2', 'Ещё 2 повторения в запасе'],
                  ['7', '3', 'Ещё 3 повторения, средне'],
                  ['6', '4', 'Ещё 4 в запасе, ощутимо легко'],
                  ['5', '5+', 'Разминочная нагрузка'],
                  ['4', '6+', 'Очень лёгкая работа'],
                ] as const).map(([rpe, rir, desc], i) => (
                  <tr key={i}>
                    <td className="w-kg" style={{ textAlign: 'left', color: Number(rpe) >= 9 ? '#ff4d4d' : Number(rpe) >= 7 ? '#ff9f40' : '#3affb8' }}>{rpe}</td>
                    <td className="w-sr">{rir}</td>
                    <td style={{ color: 'var(--muted)', fontSize: 11, textAlign: 'left' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Секция 6: протокол укрепления сухожилий ─────── */}
      <div className="section">
        <div className="section-header">
          <span className="section-num">06</span>
          <span className="section-title">Протокол укрепления сухожилий</span>
        </div>
        <div className="note-box" style={{ marginBottom: 24 }}>
          По материалам <strong>Evolution Yeti</strong> и систематических обзоров.
          Сухожилия адаптируются только при нагрузке &gt;70% ПМ (деформация 4,5–6,5%).
          Многоповторка закачивает мышцы, но <strong>не сухожилия</strong> — создаёт дисбаланс и повышает травматизм.
        </div>
        <div className="theory-grid">
          <div className="theory-card" style={{ borderLeft: '3px solid #ff6b35' }}>
            <div className="theory-card-title">Рабочий протокол</div>
            <div className="theory-card-body">
              Частота: ~3 раза/нед. Интенсивность: 85–90% ПМ. Схема: 5 подходов × 4 повторения.
              Время под нагрузкой (TUT): ~3 сек в целевой части амплитуды или ~6 сек в полной амплитуде.
              Ориентир — TUT на нужной деформации, а не отказ. Используй изолированные упражнения для точного попадания в целевое сухожилие.
            </div>
          </div>
          <div className="theory-card" style={{ borderLeft: '3px solid #ff9f40' }}>
            <div className="theory-card-title">Если сухожилие «податливое»</div>
            <div className="theory-card-body">
              Если на тесте деформация &gt;10% — начинай с ~60% ПМ и постепенно наращивай к 70–90%.
              Здоровым для прогресса нередко нужны до 90% ПМ. Прогрессируй вес постепенно, следи за болевыми ощущениями.
              При стихании боли — переходи к базовым движениям, сохраняя принцип дозировки.
            </div>
          </div>
          <div className="theory-card" style={{ borderLeft: '3px solid #ff4d4d' }}>
            <div className="theory-card-title">Что НЕ работает</div>
            <div className="theory-card-body">
              Растяжка снижает жёсткость сухожилий — в силовом тренинге это минус.
              НПВС (ибупрофен, мелоксикам, МСМ, куркумин) убирают боль, но не улучшают ремоделирование.
              Пептиды коллагена теоретически могут помочь (более устойчивы к разрушению в ЖКТ), но доказательства неоднозначные.
            </div>
          </div>
          <div className="theory-card" style={{ borderLeft: '3px solid #5ba4ff' }}>
            <div className="theory-card-title">Почему фармакология ≠ крепкие сухожилия</div>
            <div className="theory-card-body">
              Анаболические стероиды резко повышают силу мышц, но сухожилия не успевают адаптироваться.
              Натуральный атлет набирает силу за 1–2 года — сухожилия укрепляются параллельно.
              Химик достигает тех же показателей за пару месяцев — деформация уходит за 9%, копятся микротравмы и отрывы.
            </div>
          </div>
        </div>
      </div>

      {/* ── Секция 7: статьи по проекту ───────────────────── */}
      <div className="section">
        <div className="section-header">
          <span className="section-num">07</span>
          <span className="section-title">Статьи по проекту</span>
        </div>
        <div className="note-box" style={{ marginBottom: 24 }}>
          Короткие инженерные заметки о том, что в этом проекте даёт наибольший выигрыш по надёжности и поддержке кода.
        </div>
        <div className="theory-grid">
          {projectArticles.map((article, i) => (
            <div key={i} className="theory-card">
              <div className="theory-card-title">{article.title}</div>
              <div className="theory-card-body">{article.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Секция 8: источники ────────────────────────────── */}
      <div className="section">
        <div className="section-header">
          <span className="section-num">08</span>
          <span className="section-title">Источники</span>
        </div>
        <div className="note-box">
          <strong>Evolution Yeti</strong> — видеоролики и посты на Boosty:<br />
          · «СИЛОВОЙ ТРЕНИНГ НАТУРАЛЬНО: Мануал по RPE» (аудио-мануал, 2 части)<br />
          · «Черновик-конспект: Сухожилия» (сводка систематического обзора)<br />
          · «TIER LIST СПОРТИВНЫХ ДОБАВОК» (Boosty, 08.01.2026)<br />
          · «БИОХАКИНГ / НЕЗАМЕНИМЫЕ ДОБАВКИ ДЛЯ ТРЕНИРОВОК» (YouTube, 14.02.2025)<br />
          · «Силовой Цикл 6-недельный» (черновик программы)<br />
          · «Приседания (Squat)» (техника и принципы)
        </div>
      </div>
    </>
  )
}
