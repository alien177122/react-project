import { TimelineConnector } from './TimelineConnector'

const PROTOCOL_STEPS = [
  {
    num: '1',
    color: '#ff6b35',
    title: 'Высокая интенсивность',
    body: '85-90% ПМ: работай на тяжёлых весах, где можешь контролировать каждое повторение.',
  },
  {
    num: '2',
    color: '#ff9f40',
    title: 'Низкий объём',
    body: '5x4 повторения: много подходов, но мало повторений в каждом. Это сохраняет качество и нужную деформацию.',
  },
  {
    num: '3',
    color: '#ff4d4d',
    title: 'Время под нагрузкой',
    body: 'Удержание 3-4 секунды в пике момента силы: именно здесь сухожилие получает рабочий стимул для ремоделирования.',
  },
  {
    num: '4',
    color: '#5ba4ff',
    title: 'Частота',
    body: '3 раза в неделю: достаточно для адаптации, но с паузами, которые позволяют ткани восстанавливаться.',
  },
] as const

export function TendonProtocolSection() {
  return (
    <TimelineConnector gradient="linear-gradient(to bottom, #ff6b35, #ff4d4d, #5ba4ff)">
      {PROTOCOL_STEPS.map(step => (
        <div key={step.num} className="timeline-step">
          <div className="timeline-dot" style={{ background: step.color }} />
          <h3 className="theory-top-name" style={{ color: step.color, marginBottom: 6 }}>
            {step.num}. {step.title}
          </h3>
          <p className="theory-card-body">{step.body}</p>
        </div>
      ))}
    </TimelineConnector>
  )
}
