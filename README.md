![image alt](https://github.com/0H3rY0/Task-Manager/blob/0f329a1a7b83b96758e630a23297637144cb7a5b/%F0%9F%92%BBTaskManager.png)

## ✍️ Description
TaskManager is a project management tool that allows users to create, organize, and track tasks efficiently. It helps users collaborate with others, set deadlines, and monitor progress in a streamlined way.
(This project is not finished yet but will be continued soon.)

⚠️ PS: Currently, the displayed data is not personalized per user, and not all features are fully implemented yet.

## ⚙️ Installation

### Database Setup

1. Download the database file: [taskmanager.sql](database/task-manager.sql)
2. Open **phpMyAdmin** or any MySQL client.
3. Create a new database named `task-manager`.
4. Import the downloaded file into the `task-manager` database.
5. Update your `.env` or configuration file with database credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=task-manager

### Terminal Setup
frontend: 

```bash
npm install
```

```bash
npm run dev
```

```bash
npm start
```

backend: 

```bash
cd server
```

```bash
npm install
```

```bash
npm run dev
```

## 🖼️ Illustrative photos
![image alt](https://github.com/0H3rY0/Task-Manager/blob/e0158f9f549e0c3a9833447ffb7445e4969db4fa/Home.png)
![image alt](https://github.com/0H3rY0/Task-Manager/blob/e0158f9f549e0c3a9833447ffb7445e4969db4fa/Upcoming.png)
![image alt](https://github.com/0H3rY0/Task-Manager/blob/e0158f9f549e0c3a9833447ffb7445e4969db4fa/User.png)

## ⌨️ Technologies
- **React**
- **Node.js**
- **MySQL**

## 🔮 Next steps

- 👷‍♂️ **Add and fix validations**
- 📋 **Change database structure to replace json server**
- 👤 **create a user collaboration system**
