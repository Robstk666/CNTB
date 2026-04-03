import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, X, Home, User, FileText, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingPaths } from './components/ui/background-paths';
import { BackgroundBeams } from './components/ui/background-beams';
import Hero from './components/ui/animated-shader-hero';
import { CometCard } from './components/ui/comet-card';
import { PinContainer } from './components/ui/3d-pin';
import { GooeyText } from './components/ui/gooey-text-morphing';
import VaporizeTextCycle from './components/ui/vapour-text-effect';
import { InstructionView } from './components/ui/instruction-view';
import { NavBar } from './components/ui/tubelight-navbar';
import { CircularTestimonials } from './components/ui/circular-testimonials';
import InteractiveSelector from './components/ui/interactive-selector';
import ReglamentBook from './components/ui/reglament-book';
import './App.css';

const navItems = [
  { name: 'главная', url: '#', icon: Home },
  { name: 'команда', url: '#', icon: User },
  { name: 'изделия', url: '#', icon: Package },
  { name: 'регламент ОЭА', url: '#', icon: FileText }
];

const teamData = [
  {
    quote: "Внедрение инноваций и автоматизация процессов — наш главный приоритет, создающий комфортную среду для каждого сотрудника.",
    name: "Гржимайло Роберт",
    designation: "Руководитель отдела",
    src: "/team/t1.png",
    hoverSrc: "/team/t11.png",
    skills: [
      { name: "лидерство", value: 95 },
      { name: "архитектура систем", value: 90 },
      { name: "менеджмент", value: 92 },
      { name: "стратегия", value: 88 }
    ]
  },
  {
    quote: "Новый формат инструкций позволяет усваивать материал в два раза быстрее, оставаясь в курсе всех внутренних регламентов.",
    name: "Сергей Куц",
    designation: "Библиотекарь",
    src: "/team/t2.png",
    hoverSrc: "/team/t22.png",
    skills: [
      { name: "систематизация", value: 89 },
      { name: "аналитика данных", value: 85 },
      { name: "инструктаж", value: 94 },
      { name: "методология", value: 87 }
    ]
  },
  {
    quote: "Истинный поиск не знает преград: я добуду любое издание из глубин архивов, открывая доступ к сокровищам НЭБ для каждого.",
    name: "Лилия Куликова",
    designation: "Главный библиотекарь",
    src: "/team/t3.png",
    hoverSrc: "/team/t33.png",
    skills: [
      { name: "библио-поиск", value: 98 },
      { name: "работа с НЭБ", value: 95 },
      { name: "настойчивость", value: 100 },
      { name: "фондирование", value: 91 }
    ]
  },
  {
    quote: "у истоках и смыслах, в основе всего лежит информация",
    name: "Сергей Павлов",
    designation: "Главный библиотекарь",
    src: "/team/t4.png",
    hoverSrc: "/team/t44.png",
    skills: [
      { name: "глубина смыслов", value: 92 },
      { name: "архивация", value: 88 },
      { name: "информационный синтез", value: 94 },
      { name: "философия данных", value: 96 }
    ]
  },
  {
    quote: "Пришел, увидел, систематизировал. Как зодчие возводят храмы из камня, так мы строим сокровищницы знаний из чертежей и манускриптов.",
    name: "Алексей Истомин",
    designation: "Библиотекарь",
    src: "/team/t5.png",
    hoverSrc: "/team/t55.png",
    skills: [
      { name: "систематизация", value: 96 },
      { name: "архитектурный план", value: 91 },
      { name: "кристаллография знаний", value: 88 },
      { name: "порядок", value: 94 }
    ]
  },
  {
    quote: "Оцифровка — это искусство перевода хрупкой памяти бумаги в вечный цифровой код, доступный каждому.",
    name: "Олеся Кузнецова",
    designation: "Специалист",
    src: "/team/t6.png",
    hoverSrc: "/team/t66.png",
    skills: [
      { name: "скорость оцифровки", value: 94 },
      { name: "точность сканирования", value: 98 },
      { name: "цифровой ремастеринг", value: 87 },
      { name: "обработка метаданных", value: 92 }
    ]
  },
  {
    quote: "Каждая книга шепчет свою историю, наша задача — дать ей голос в цифровом пространстве.",
    name: "Мария Хасарбиева",
    designation: "Библиотекарь",
    src: "/team/t7.png",
    hoverSrc: "/team/t77.png",
    skills: [
      { name: "перевод в цифру", value: 91 },
      { name: "интуиция поиска", value: 96 },
      { name: "структурирование", value: 89 },
      { name: "философия текста", value: 93 }
    ]
  },
];

const instructionsData = {
  "instruction_1": {
    id: "instruction_1",
    title: "КАК ВЫПОЛНИТЬ ЗАКАЗ В ЭЛЕКТРОННЫЙ АБОНЕМЕНТ",
    steps: [
      {
        step: 1,
        text: "Для проверки заказа необходимо перейти в меню «Циркуляция»",
        image: "/inst1/1.png"
      },
      {
        step: 2,
        text: "Далее перейти в «Контроль движения документов»",
        image: "/inst1/2.png"
      },
      {
        step: 3,
        text: "Выбрать «Диспетчер ЭБА»",
        image: "/inst1/3.png"
      },
      {
        step: 4,
        text: "Новые заказы на текущую дату могут отсутствовать. В таком случае необходимо проверить статус заказов на более раннюю (минимум три дня назад).",
        image: "/inst1/4.png"
      },
      {
        step: 5,
        text: "Выбрать из выпадающего списка «все» заказы и нажать «ПОИСК»",
        image: "/inst1/5.png"
      },
      {
        step: 6,
        text: "Дальнейшие действия не требуются, когда все заказы имеют статус «Закрыт» или не актуальны для выполнения",
        image: "/inst1/6.png"
      },
      {
        step: 7,
        text: "Каждый новый заказ получает статус «Заказ принят» Диспетчер выполняет печать требования для передачи сотрудникам отдела библиотечного обслуживания и поиска в отдел хранения библиотечных фондов.",
        image: "/inst1/7.png"
      },
      {
        step: 8,
        text: "Выбирается нужный заказ и нажимается «Печать требований»",
        image: "/inst1/8.png"
      },
      {
        step: 9,
        text: "В сплывающем окне выбирается устройство и нажимается «Печать»",
        image: "/inst1/9.png"
      },
      {
        step: 10,
        text: "Заказ переходит из «Актуальный заказ» <br> в «Требование рапечатано»",
        image: "/inst1/10.png"
      },
      {
        step: 11,
        text: "Для отображения выбирается «все» заказы <br> и актуальные даты для поиска.",
        image: "/inst1/11.png"
      },
      {
        step: 12,
        text: "Перед выполнением работ по оцифровке необходимо сделать действие «Привязка заказ/документ». Снимаются все отметки <br>и устанавливается одна для необходимого заказа.",
        image: "/inst1/12.png"
      },
      {
        step: 13,
        text: "Кода заказа и Код документа заполнятся автоматически <br> и не подлежат изменению. Код получателя необходимо вводить самостоятельно (является кодом читателя)",
        image: "/inst1/13.png"
      },
      {
        step: 14,
        text: "После заполнения всех обязательных полей нажимается «ВЫПОЛНИТЬ»",
        image: "/inst1/14.png"
      },
      {
        step: 15,
        text: "Привязка завершена после появления информации <br> об успешной операции.",
        image: "/inst1/15.png"
      },
      {
        step: 16,
        text: "Статус заказа изменяется на «Выполняется».",
        image: "/inst1/16.png"
      },
      {
        step: 17,
        text: "После оцифровке книги создается папка с готовым PDF<br> и исходными образами в соответствии с шаблоном",
        image: "/inst1/17.png"
      },
      {
        step: 18,
        text: "Для преобразования формата используется программа FlippingBook",
        image: "/inst1/18.png"
      },
      {
        step: 19,
        text: "Возможно выбрать файл вручную указав путь и нажать открыть <br> или перетащить PDF файл",
        image: "/inst1/19.png"
      },
      {
        step: 20,
        text: "В появившемся окне нажать кнопку «Начать»",
        image: "/inst1/20.png"
      },
      {
        step: 21,
        text: "Запускается процесс конвертирования",
        image: "/inst1/21.png"
      },
      {
        step: 22,
        text: "После завершения применяется общий шаблон<br> для внешнего вида книги и необходимо проверить все настройки",
        image: "/inst1/22.png"
      },
      {
        step: 23,
        text: "Вкладка «Внешний вид»: Изображение для фона",
        image: "/inst1/23.png"
      },
      {
        step: 24,
        text: "Вкладка «Компоненты»: Убрать возможность «Поделиться» <br> и «Печать и загрузка файлов»",
        image: "/inst1/24.png"
      },
      {
        step: 25,
        text: "Вкладка «Настройки загрузчика»: Выбираем тип и логотип",
        image: "/inst1/25.png"
      },
      {
        step: 26,
        text: "Вкладка «Книга»: Режим листания страниц Убрать возможность выделять и копировать текст и установить твердую обложку",
        image: "/inst1/26.png"
      },
      {
        step: 27,
        text: "После всех настроек выбираем «Загрузить публикацию»",
        image: "/inst1/27.png"
      },
      {
        step: 28,
        text: "Проверяем тип доступа и выбираем локальную папку<br> для сохранения",
        image: "/inst1/28.png"
      },
      {
        step: 29,
        text: "Доступность для поиска должна быть отключена",
        image: "/inst1/29.png"
      },
      {
        step: 30,
        text: "Создается папка в соответствии с инвентарным номером. Имя должно состоять строго из латинских букв(если они присутствуют) Знак / заменяется на -",
        image: "/inst1/30.png"
      },
      {
        step: 31,
        text: "Путь указывается без названия книги <br>(только инвентарный номер в названии)",
        image: "/inst1/31.png"
      },
      {
        step: 32,
        text: "Нажимается кнопка «Начать» для сохранения в папку",
        image: "/inst1/32.png"
      },
      {
        step: 33,
        text: "Начинается процесс сохранения публикации",
        image: "/inst1/33.png"
      },
      {
        step: 34,
        text: "После завершения есть возможность просмотра <br> и завершения кнопкой «Готово»",
        image: "/inst1/34.png"
      },
      {
        step: 35,
        text: "Для конвертирования библиографической записи в электронный каталог необходим переход в модуль «Каталогизация»",
        image: "/inst1/35.png"
      },
      {
        step: 36,
        text: "Переход в основное меню и выбор «Каталогизация»",
        image: "/inst1/36.png"
      },
      {
        step: 37,
        text: "Поиск проходит по инвентарному номеру книги и в едином каталоге",
        image: "/inst1/37.png"
      },
      {
        step: 38,
        text: "Выбор базы данных 'Единый каталог' и области поиска 'Инвентарный номер/Баркод'",
        image: "/inst1/38.png"
      },
      {
        step: 39,
        text: "Ввод инвентарного номера в поле Поисковое выражение",
        image: "/inst1/39.png"
      },
      {
        step: 40,
        text: "Библиографическая запись найдена. Нужно сразу обратить внимание локализацию и при необходимости совершить это действие передать книгу библиографам (До конвертации в ЭК)",
        image: "/inst1/40.png"
      },
      {
        step: 41,
        text: "Нажимаем «Конвертер в ЭК»",
        image: "/inst1/41.png"
      },
      {
        step: 42,
        text: "Выбирается «Каталог оцифровки»<br> и нажимаем «Конвертировать» запись",
        image: "/inst1/42.png"
      },
      {
        step: 43,
        text: "В появившемся окне находим 856 поле. <br>Вставляем ссылку на книгу строго по шаблону",
        image: "/inst1/43.png"
      },
      {
        step: 44,
        text: "Если книга имеет несколько копий (экземпляров),<br> то корректируется 455 поле<br> и удаляются лишние инвентарные номера (см. инструкцию)",
        image: "/inst1/44.png"
      },
      {
        step: 45,
        text: "Нажимаем кнопку «Локализовать» и выбираем нужный метод",
        image: "/inst1/45.png"
      },
      {
        step: 46,
        text: "Выбор листа ввода Книга (цифровая копия)",
        image: "/inst1/46.png"
      },
      {
        step: 47,
        text: "Нажимаем «Записать» и далее «Запись готова»",
        image: "/inst1/47.png"
      },
      {
        step: 48,
        text: "Проверяем, что запись сформирована",
        image: "/inst1/48.png"
      },
      {
        step: 49,
        text: "При отсутствии ошибок <br>отобразиться зеленый текст «Запись готова»",
        image: "/inst1/49.png"
      },
      {
        step: 50,
        text: "Для завершения заказа необходимо зайти в модуль «Циркуляция»",
        image: "/inst1/50.png"
      },
      {
        step: 51,
        text: "Далее в «Контроль движения документов»",
        image: "/inst1/51.png"
      },
      {
        step: 52,
        text: "Выбираем «Подготовка ЭД»",
        image: "/inst1/52.png"
      },
      {
        step: 53,
        text: "Ввести код документа (инвентарный номер книги)",
        image: "/inst1/53.png"
      },
      {
        step: 54,
        text: "После ввода нажать «Выполнить»",
        image: "/inst1/54.png"
      },
      {
        step: 55,
        text: "Операция завершена. Для продолжения нажмите ОЧИСТИТЬ",
        image: "/inst1/55.png"
      },
      {
        step: 56,
        text: "Необходимо ввести актуальные даты периода использования. Книга выдается читателю в день выполнения (не на завтра/вчера, а сегодня). Срок устанавливается 10 календарных дней",
        image: "/inst1/56.png"
      },
      {
        step: 57,
        text: "Если книга готова до 12:00, то отсчет идет от сегодня. Если позднее, то от завтрашнего дня. Так же заполняется комментарий и текст уведомления.",
        image: "/inst1/57.png"
      },
      {
        step: 58,
        text: "Нажимаем «Заказать и отправить уведомление»",
        image: "/inst1/58.png"
      },
      {
        step: 59,
        text: "Если все прошло верно и без ошибок,<br> то появляется сообщение об успешной операции.",
        image: "/inst1/59.png"
      },
      {
        step: 60,
        text: "Для закрытия заказа переходим в модуль «Циркуляция»",
        image: "/inst1/60.png"
      },
      {
        step: 61,
        text: "Нажимаем «Контроль движения документов»",
        image: "/inst1/61.png"
      },
      {
        step: 62,
        text: "Переходим в «Диспетчер ЭБА»",
        image: "/inst1/62.png"
      },
      {
        step: 63,
        text: "Выбираем «все» заказы и актуальные даты для проверки статуса. Нажимаем «ПОИСК»",
        image: "/inst1/63.png"
      },
      {
        step: 64,
        text: "Статус изменился на «Отработан»<br> и заказ готов к завершению цикла движения.",
        image: "/inst1/64.png"
      },
      {
        step: 65,
        text: "Переходим в вкладку «ВОЗВРАТ» Вводим код документа (инвентарный номер)",
        image: "/inst1/65.png"
      },
      {
        step: 66,
        text: "Нажимаем «ВЫПОЛНИТЬ»",
        image: "/inst1/66.png"
      },
      {
        step: 67,
        text: "При успешной операции по возврату появляется информация <br>о завершении цикла движения",
        image: "/inst1/67.png"
      },
      {
        step: 68,
        text: "Статус заказа изменился на «Закрыт» ЗАКАЗ ВЫПОЛНЕН",
        image: "/inst1/68.png"
      }
    ]
  },
  "instruction_2": {
    id: "instruction_2",
    title: "КАК ПРАВИЛЬНО РАЗМЕСТИТЬ В ЭЛЕКТРОННЫЙ КАТАЛОГ",
    steps: [
      { text: "информация скоро будет готова" }
    ]
  },
  "instruction_3": {
    id: "instruction_3",
    title: "КАК СОЗДАТЬ ОБЛОЖКУ",
    steps: [
      { text: "информация скоро будет готова, но вы можете посмотреть видео" }
    ]
  }
};

function App() {
  const [view, setView] = useState('splash'); // 'splash', 'dashboard', 'instruction', 'completion', 'character'
  const [activeInstructionId, setActiveInstructionId] = useState(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [currentNavTab, setCurrentNavTab] = useState('главная');
  const [activeCharacter, setActiveCharacter] = useState(null);

  useEffect(() => {
    // Splash screen transitioned immediately if button clicked,
    // otherwise auto transition after some time as requested originally.
    if (view === 'splash') {
      const timer = setTimeout(() => {
        setView('dashboard');
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [view]);

  const openInstruction = (id) => {
    setActiveInstructionId(id);
    setActiveStepIndex(0);
    setView('instruction');
  };

  const closeInstruction = () => {
    setView('dashboard');
    setActiveInstructionId(null);
    setActiveStepIndex(0);
  };

  const markInstructionComplete = () => {
    setView('completion');
  };

  const goNextStep = () => {
    if (activeStepIndex < instructionsData[activeInstructionId].steps.length - 1) {
      setActiveStepIndex(activeStepIndex + 1);
    }
  };

  const goPrevStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    }
  };

  const handleCrosslink = (targetId) => {
    openInstruction(targetId);
  };

  if (view === 'splash') {
    return (
      <Hero
        trustBadge={{
          text: <>система обучения <span className="uppercase-oea">оэа</span></>,
        }}
        headline={{
          line1: "логотип",
          line2: "цнтб са"
        }}
        subtitle={<>отдел электронного абонемента</>}
        buttons={{
          primary: {
            text: "начать работу",
            onClick: () => setView('dashboard')
          }
        }}
      />
    );
  }

  if (view === 'dashboard') {
    return (
      <div className="relative min-h-screen bg-[#f5f5f7] p-6 pt-24 md:p-12 md:pt-24 animate-fade-in flex flex-col items-center overflow-hidden font-sans">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <BackgroundBeams />
        </div>
        <NavBar items={navItems} activeTab={currentNavTab} setActiveTab={setCurrentNavTab} />

        {currentNavTab === 'главная' && (
          <>
            <div className="z-10 w-full mb-16 mt-8">
              <GooeyText
                texts={["инструкции", "для", "ОЭА"]}
                morphTime={1.2}
                cooldownTime={0.4}
                className="w-full lowercase"
                textClassName="text-[#1d1d1f] drop-shadow-sm lowercase"
              />
            </div>

            <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mt-4">
              {Object.values(instructionsData).map((inst) => (
                <div key={inst.id} className="h-[22rem] w-full flex items-center justify-center">
                  <PinContainer
                    title="начать"
                    onClick={() => openInstruction(inst.id)}
                    containerClassName="w-full"
                  >
                    <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[18rem] h-[18rem]">
                      <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100 lowercase">
                        {inst.title}
                      </h3>
                      <div className="text-sm !m-0 !p-0 font-normal">
                        <span className="text-slate-400 lowercase">
                          {inst.steps?.length || 0} шагов
                        </span>
                      </div>
                      <div className="flex flex-1 w-full rounded-xl mt-4 items-center justify-center overflow-hidden bg-white">
                        <img src="/oealogo.png" alt="ОЭА" className="h-20 w-auto object-contain" />
                      </div>
                    </div>
                  </PinContainer>
                </div>
              ))}
            </div>
          </>
        )}

        {currentNavTab === 'команда' && (
          <div className="z-10 w-full flex flex-col items-center mt-4">
            <GooeyText
              texts={["наша", "команда"]}
              morphTime={1.2}
              cooldownTime={0.4}
              className="w-full lowercase mb-0"
              textClassName="text-[#1d1d1f] drop-shadow-sm lowercase"
            />
            <CircularTestimonials
              testimonials={teamData}
              autoplay={true}
              colors={{
                name: "#1d1d1f",
                designation: "#6b7280",
                testimony: "#4b5563",
                arrowBackground: "rgba(255, 255, 255, 0.8)",
                arrowForeground: "#1d1d1f",
                arrowHoverBackground: "#f5f5f7",
              }}
              fontSizes={{
                name: "2rem",
                designation: "1.125rem",
                quote: "1.25rem",
              }}
              onCharacterClick={(char) => {
                setActiveCharacter(char);
                setView('character');
              }}
            />
          </div>
        )}

        {currentNavTab === 'изделия' && (
          <div className="z-10 w-full flex flex-col items-center mt-0">
            <InteractiveSelector />
          </div>
        )}

        {currentNavTab === 'регламент ОЭА' && (
          <div className="z-10 w-full flex flex-col items-center mt-0">
            <ReglamentBook pdfFile="/reglament.pdf" />
          </div>
        )}
      </div>
    );
  }

  if (view === 'instruction' && activeInstructionId) {
    const instruction = instructionsData[activeInstructionId];
    const step = instruction.steps[activeStepIndex];
    const totalSteps = instruction.steps.length;

    return (
      <InstructionView
        instruction={instruction}
        step={step}
        activeStepIndex={activeStepIndex}
        totalSteps={totalSteps}
        closeInstruction={closeInstruction}
        goPrevStep={goPrevStep}
        goNextStep={goNextStep}
        markInstructionComplete={markInstructionComplete}
        handleCrosslink={handleCrosslink}
      />
    );
  }

  if (view === 'completion') {
    return (
      <div className="relative min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center overflow-hidden font-sans">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <BackgroundBeams />
        </div>
        <VaporizeTextCycle
          texts={["готово, вы молодец!"]}
          font={{
            fontFamily: "Onest, sans-serif",
            fontSize: "46px",
            fontWeight: 600
          }}
          color="#1d1d1f"
          spread={5}
          density={5}
          animation={{
            vaporizeDuration: 2.0,
            fadeInDuration: 0.1,
            waitDuration: 0.1
          }}
          direction="left-to-right"
          alignment="center"
          onComplete={closeInstruction}
        />
      </div>
    );
  }

  if (view === 'character') {
    return (
      <div className="relative min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center overflow-hidden font-sans p-6 md:p-12 animate-fade-in">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <BackgroundBeams />
        </div>

        {/* Header Bar */}
        <div className="z-10 absolute top-0 inset-x-0 bg-white/50 backdrop-blur-2xl px-6 md:px-12 py-4 flex justify-between items-center border-b border-gray-200/60">
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-[#1d1d1f] truncate mr-4 lowercase">
            профиль: {activeCharacter?.name}
          </h2>
          <button
            onClick={() => setView('dashboard')}
            className="bg-gray-200/50 hover:bg-gray-200 text-[#1d1d1f] rounded-full font-medium px-6 py-2 transition-all flex items-center lowercase"
          >
            <ArrowLeft size={20} className="mr-2" />
            назад
          </button>
        </div>

        {/* Character Card */}
        <div className="z-10 mt-20 max-w-4xl w-full bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-[32px] overflow-hidden shadow-lg flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-64 md:h-auto relative group overflow-hidden">
            <img
              src={activeCharacter?.src}
              alt={activeCharacter?.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 text-white font-bold text-lg lowercase tracking-widest drop-shadow-md">
                level 99 {activeCharacter?.designation}
            </div>
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="inline-block bg-[#0071e3]/10 text-[#0071e3] px-4 py-1.5 rounded-full text-xs font-black lowercase mb-4 w-fit border border-[#0071e3]/20 tracking-wider">
              {activeCharacter?.designation}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-[#1d1d1f] mb-6 lowercase tracking-tight leading-none">
              {activeCharacter?.name}
            </h1>

            <div className="space-y-8">
              <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100/50">
                <h3 className="text-[10px] font-black text-gray-400 mb-2 lowercase tracking-[0.2em] uppercase">девиз персонажа</h3>
                <p className="text-base text-gray-700 italic leading-relaxed lowercase text-balance opacity-90">
                  "{activeCharacter?.quote}"
                </p>
              </div>

              <div className="pt-2">
                <h3 className="text-[10px] font-black text-gray-400 mb-6 lowercase tracking-[0.2em] uppercase">характеристики (RPG STATS)</h3>
                <div className="space-y-5">
                  {(activeCharacter?.skills || [
                      { name: "интеллект", value: 98 },
                      { name: "скорость", value: 85 },
                      { name: "оцифровка", value: 92 },
                      { name: "фондирование", value: 88 }
                  ]).map((skill, idx) => (
                      <div key={idx} className="group">
                          <div className="flex justify-between items-end mb-2">
                              <span className="text-[11px] font-bold text-gray-500 lowercase tracking-wide group-hover:text-[#1d1d1f] transition-colors">{skill.name}</span>
                              <span className="text-[11px] font-black text-[#1d1d1f]">{skill.value}%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200/30">
                              <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.value}%` }}
                                  transition={{ duration: 1.5, delay: 0.2 + (0.1 * idx), ease: "circOut" }}
                                  className="h-full bg-gradient-to-r from-[#0071e3] to-[#40a9ff] rounded-full shadow-[0_0_8px_rgba(0,113,227,0.3)]"
                              />
                          </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 group">
              <button className="w-full bg-[#1d1d1f] hover:bg-black text-white rounded-full font-bold py-4 text-base transition-all duration-300 lowercase shadow-md hover:shadow-xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 overflow-hidden relative">
                <span className="relative z-10 font-bold tracking-tight">начать взаимодействие</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
