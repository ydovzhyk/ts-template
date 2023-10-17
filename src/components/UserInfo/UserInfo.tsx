import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/hooks';
import { getLogin, getUser } from '../../Redux/auth/auth-selectors'

import { logout } from '../../Redux/auth/auth-operations';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { RxDividerVertical } from 'react-icons/rx';
import { BsEscape } from 'react-icons/bs';
import Button from '../Shared/Button';

import s from './UserInfo.module.scss';

const UserInfo: React.FC = () => {
    const isUserLogin = useSelector(getLogin);
    const user = useSelector(getUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isActive = true;
    const customClassName = isActive ? `${s.link} ${s.active} ${s.custom}` : `${s.link} ${s.custom}`;
    
    const onLogout = async () => {
    navigate('/');
    await dispatch(logout());

    const authData = {
      accessToken: null,
      refreshToken: null,
      sid: null,
    };
    await localStorage.setItem('ts-template.authData', JSON.stringify(authData));
  };

    if (!isUserLogin) {
    return (
      <div className={s.userInfoSide}>
        <div className={s.userWrapper}>
          <div className={s.wrapper}>
            <NavLink className={customClassName} to="/auth/login">
              <AiOutlinePoweroff
                size={25}
                style={{
                  color: 'var(--icons-color)',
                  marginRight: '5px',
                }}
              />
              <span>Вхід</span>
            </NavLink>
          </div>
        </div>
      </div>
    );
  } else {
    return (
        <div className={s.userInfoSide}>
        <div className={s.userWrapper}>
          <div className={s.wrapper}>
            <div className={s.userBlock}>
                {user.userAvatar !== null && (
                    <img src={user.userAvatar} alt="Userphoto" className={s.userPhoto} />
                )}
            </div>
              <span>{user.username}</span>
          </div>
          <RxDividerVertical
            size={40}
            style={{
              color: 'var(--border-color)',
            }}
          />
          <div className={s.wrapper}>
            <BsEscape
              size={25}
              style={{
                marginRight: '10px',
                color: 'var(--icons-color)',
              }}
            />
            <Button
              text="Вихід"
              type="button"
              handleClick={onLogout}
              btnClass="exitHeaderBtn"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;