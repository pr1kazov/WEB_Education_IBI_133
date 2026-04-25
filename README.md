# iPad Django Project

Полноценное Django-веб-приложение на основе статического HTML-сайта про iPad.  
Проект включает:

- многостраничный сайт (главная, характеристики, галерея, причины выбора, аксессуары);
- систему регистрации и входа пользователей;
- форму отзывов;
- голосование за модели iPad с сохранением в БД;
- JSON API для голосования и получения отзывов;
- админ-панель для управления контентом.

---

## Оглавление

- [Технологии](#технологии)
- [Функциональность](#функциональность)
- [Структура проекта](#структура-проекта)
- [Требования](#требования)
- [Быстрый старт](#быстрый-старт)
- [Установка и запуск (пошагово)](#установка-и-запуск-пошагово)
- [Команды для разработки](#команды-для-разработки)
- [Работа с админкой](#работа-с-админкой)
- [API](#api)
- [Маршруты сайта](#маршруты-сайта)
- [Модели базы данных](#модели-базы-данных)
- [Статика и медиа](#статика-и-медиа)
- [Аутентификация и доступ](#аутентификация-и-доступ)
- [Логирование](#логирование)
- [Проверка проекта](#проверка-проекта)
- [Типичные проблемы и решения](#типичные-проблемы-и-решения)
- [Планы по развитию](#планы-по-развитию)

---

## Технологии

- **Backend:** Django
- **API:** Django REST Framework (подключен, используется для сериализаторов)
- **CORS:** `django-cors-headers`
- **База данных:** SQLite (`db.sqlite3`)
- **Изображения:** Pillow
- **Frontend:** HTML, CSS, JavaScript
- **Аутентификация:** встроенная система Django (`django.contrib.auth`)

---

## Функциональность

### Пользовательская часть

- Главная страница с описанием iPad.
- Галерея изображений iPad.
- Технические характеристики.
- Разделы «Почему iPad» и «Аксессуары».
- Тёмная тема.
- Слайдер изображений.
- Таймер обратного отсчета.
- Кнопка прокрутки вверх.
- Случайная смена фона.
- Голосование за лучшую модель iPad с отображением результатов в процентах.
- Регистрация и вход пользователей.
- Форма отправки отзывов (доступна авторизованным пользователям).

### Административная часть

- Управление категориями iPad.
- Управление моделями iPad.
- Просмотр голосов.
- Просмотр отзывов.

### API

- Получение статистики голосования.
- Отправка голоса.
- Получение списка отзывов.

---

## Структура проекта

```text
WEB_Education_IBI_133/
├── manage.py
├── requirements.txt
├── .env.example
├── .gitignore
├── iPadProject/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
└── ipad_app/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── forms.py
    ├── models.py
    ├── serializers.py
    ├── urls.py
    ├── views.py
    ├── migrations/
    │   ├── __init__.py
    │   └── 0001_initial.py
    ├── templates/
    │   ├── base.html
    │   ├── index.html
    │   ├── specs.html
    │   ├── gallery.html
    │   ├── why.html
    │   ├── accessories.html
    │   ├── review.html
    │   ├── includes/
    │   │   ├── slider.html
    │   │   ├── timer.html
    │   │   ├── voting.html
    │   │   └── theme_buttons.html
    │   └── registration/
    │       ├── login.html
    │       └── signup.html
    └── static/
        ├── css/
        │   └── style.css
        ├── js/
        │   └── script.js
        └── images/
            ├── ipad.jpg
            ├── ipad_Air.jpg
            └── ipad_mini.jpg
```

---

## Требования

- Python **3.11+** (проект протестирован в окружении с Python 3.13).
- `pip`
- (Опционально) `venv` для изоляции зависимостей.

> Важно: в `requirements.txt` указаны пакеты без фиксации версий, чтобы установка была совместима с текущей версией Python.

---

## Быстрый старт

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Откройте в браузере: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

## Установка и запуск (пошагово)

### 1) Клонирование проекта

```bash
git clone <URL_ВАШЕГО_РЕПОЗИТОРИЯ>
cd WEB_Education_IBI_133
```

### 2) Создание и активация виртуального окружения

**macOS / Linux**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

**Windows (PowerShell)**

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### 3) Установка зависимостей

```bash
pip install -r requirements.txt
```

### 4) Применение миграций

```bash
python manage.py migrate
```

### 5) Создание локального `.env`

```bash
cp .env.example .env
```

При необходимости измените значения в `.env`:

- `DJANGO_SECRET_KEY` — ваш секретный ключ;
- `DEBUG` — `True` для локальной разработки;
- `ALLOWED_HOSTS` — список хостов через запятую.

### 6) Создание суперпользователя

```bash
python manage.py createsuperuser
```

### 7) Запуск сервера

```bash
python manage.py runserver
```

---

## Команды для разработки

```bash
# Проверка конфигурации Django
python manage.py check

# Создание миграций после изменений в models.py
python manage.py makemigrations

# Применение миграций
python manage.py migrate

# Запуск shell Django
python manage.py shell

# Сборка статики (для production)
python manage.py collectstatic
```

---

## Работа с админкой

1. Создайте суперпользователя:
   ```bash
   python manage.py createsuperuser
   ```
2. Перейдите по адресу: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)
3. Войдите под учетной записью суперпользователя.
4. Добавьте:
   - `IPadCategory`;
   - `IPadModel`;
   - (по мере использования) `Vote`, `Review`.

---

## API

### 1) Голосование

**Endpoint:** `POST /api/vote/`

Отправляет голос за одну из моделей (`pro`, `air`, `mini`, `base`).

Пример запроса:

```bash
curl -X POST http://127.0.0.1:8000/api/vote/ \
  -H "Content-Type: application/json" \
  -d '{"model":"pro"}'
```

Пример ответа (успех):

```json
{
  "success": true,
  "votes": {
    "pro": 3,
    "air": 1,
    "mini": 2
  }
}
```

Пример ответа (повторное голосование из той же сессии):

```json
{
  "success": false,
  "message": "Вы уже голосовали!"
}
```

---

### 2) Получение статистики голосования

**Endpoint:** `GET /api/vote/`

Пример ответа:

```json
{
  "pro": 3,
  "air": 1,
  "mini": 2,
  "base": 0
}
```

---

### 3) Получение отзывов

**Endpoint:** `GET /api/reviews/`

Пример ответа:

```json
[
  {
    "name": "Иван",
    "text": "Отличный планшет для учебы",
    "rating": 5,
    "created_at": "2026-04-25T14:00:00Z"
  }
]
```

---

## Маршруты сайта

| URL | Назначение |
|---|---|
| `/` | Главная страница |
| `/specs/` | Технические характеристики |
| `/gallery/` | Галерея |
| `/why/` | Почему iPad |
| `/accessories/` | Аксессуары |
| `/signup/` | Регистрация |
| `/accounts/login/` | Вход |
| `/accounts/logout/` | Выход |
| `/review/` | Оставить отзыв (только для авторизованных) |
| `/admin/` | Админ-панель |
| `/api/vote/` | API голосования |
| `/api/reviews/` | API отзывов |

---

## Модели базы данных

### `IPadCategory`
- `name` — название категории.
- `slug` — URL-идентификатор.
- `description` — описание.

### `IPadModel`
- `name`, `slug`, `description`, `image`.
- `category` (FK на `IPadCategory`).
- характеристики: `display`, `processor`, `memory`, `camera`, `battery`, `weight`.
- `price`.
- `release_date`, `created_at`, `updated_at`.

### `Vote`
- `ipad_model` (одна из: `pro`, `air`, `mini`, `base`).
- `user` (опционально, если авторизован).
- `session_key` (для ограничения повторного голосования в рамках сессии).
- `created_at`.

### `Review`
- `name`, `email`, `text`, `rating`.
- `created_at`.

---

## Статика и медиа

### Статика

- URL: `/static/`
- Папка: `ipad_app/static/`

В проекте используется:
- `css/style.css`
- `js/script.js`
- `images/*`

### Медиа

- URL: `/media/`
- Папка: `media/`

`IPadModel.image` загружается в `media/ipads/`.

---

## Аутентификация и доступ

- Вход/выход: через стандартные маршруты Django auth (`/accounts/...`).
- Регистрация: кастомная форма (`/signup/`).
- Страница `/review/` защищена декоратором `@login_required`.
- После входа/регистрации редирект на `/`.

---

## Логирование

В `settings.py` настроено логирование:

- файл: `warning.log`;
- уровень в файле: `WARNING`;
- вывод в консоль также включен.

---

## Проверка проекта

Рекомендуемый минимальный цикл перед коммитом:

```bash
python manage.py check
python manage.py makemigrations --check --dry-run
python manage.py migrate
python manage.py runserver
```

Проверить в браузере:

- главная страница и навигация;
- регистрация и вход;
- отправка отзыва;
- голосование и обновление диаграммы.

---

## Типичные проблемы и решения

### 1) Ошибка установки старых версий зависимостей на Python 3.13

**Проблема:** старые фиксированные версии библиотек могут не собираться.  
**Решение:** использовать актуальные версии из текущего `requirements.txt`.

### 2) Не загружается статика

- Убедитесь, что `DEBUG = True` при локальной разработке.
- Проверьте `STATICFILES_DIRS` в `settings.py`.
- Проверьте корректность `{% load static %}` и путей в шаблонах.

### 3) Ошибка при работе с изображениями

- Убедитесь, что установлен `Pillow`.
- Проверьте существование директории `media/ipads/`.

### 4) Повторное голосование блокируется слишком рано

- Ограничение основано на `session_key`.
- Очистите cookies/сессию браузера для повторного теста.

---

## Планы по развитию

- Добавить полноценные DRF ViewSet/Router для моделей.
- Добавить пагинацию и фильтрацию отзывов.
- Вынести настройки в `.env` (`DEBUG`, `SECRET_KEY`, `ALLOWED_HOSTS`).
- Подготовить production-конфигурацию (Gunicorn/Uvicorn + Nginx).
- Добавить автоматические тесты (`pytest`/`unittest`).

---

## Автор

Проект выполнен в рамках учебной работы по веб-разработке и преобразованию статического сайта в Django-приложение.
