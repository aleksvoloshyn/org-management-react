# React + Vite

**WEB-приложение с возможностью авторизации пользователей и менеджмента собственных компаний.**
https://org-management-react.vercel.app/auth
| &#10057; | &#10057; | &#10057; |
|-------------------------------|---------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Front-end:** | REACT JS, RTK QUERY, FORMIK, MUI | VERCEL |
| **Back-end** | NODE JS , EXPRESS, MONGO DB | RENDER |
| **Регистрация - Авторизация** | token (продолжительность жизни24 часа) | не авторизированный пользователь не видит разделы системы |
| **SUPER ADMIN** | **email**: supervisor@gmail.com **password**: 123456 | &#10004; Видит всех пользователей системы, &#10004; создает/удаляет/редактирует других пользователей, кроме админов, &#10004; дает/забирает админ права пользователям &#10004; видит все компании всех пользователей (редактирует/удаляет). &#10071; не может удалить себя |
| **ADMIN** | | &#10004; Видит всех пользователей системы, &#10004; создает/удаляет/редактирует других пользователей, кроме админов, &#10004; видит все компании всех пользователей (редактирует/удаляет), &#10004; может удалить себя в разделе **profile** |
