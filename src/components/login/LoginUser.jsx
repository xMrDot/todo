import style from "./Login.module.css";
const LoginUser = ({setActiveUser, userList}) => {
  return (
    <section className={style.changeUser}>
      <label htmlFor="userList">Select a user to login as</label>
      <select
        name="userList"
        id="userList"
        onChange={(e) => setActiveUser(e.target.value)}
        defaultValue={localStorage.getItem("activeUser")}
      >
        <option value="">Select a user</option>
        {userList?.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </section>
  );
};
export default LoginUser;
