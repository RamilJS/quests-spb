import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { LoginData } from '../../types/user';
import { LoginValidationPattern, STEP } from '../../const';

function LoginForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid
    },
  } = useForm<LoginData>({
    mode: 'onChange'
  });

  const onSubmit: SubmitHandler<LoginData> = (data: LoginData) => {
    dispatch(loginAction(data));
  };

  return (
    <form
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className="login-form"
      action="https://echo.htmlacademy.ru/"
      method="post"
    >
      <div className="login-form__inner-wrapper">
        <h1 className="title title--size-s login-form__title">Вход</h1>
        <div className="login-form__inputs">

          <div className="custom-input login-form__input">
            <label className="custom-input__label" htmlFor="email">
              E&nbsp;–&nbsp;mail
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Заполните поле',
                pattern: LoginValidationPattern.Email
              }
              )}
              placeholder="Адрес электронной почты"
            />
            {errors?.email && <p>Необходимо ввести валидный email</p>}
          </div>
          <div className="custom-input login-form__input">
            <label className="custom-input__label" htmlFor="password">
              Пароль
            </label>
            <input
              type="password"
              id="password"
              placeholder="Пароль"
              {...register('password', {
                required: 'Заполните поле',
                minLength:{
                  value: 3,
                  message: 'Минимум 3 символа'},
                maxLength:{
                  value: 15,
                  message: 'Максимум 15 символов'},
                pattern: LoginValidationPattern.Password
              }
              )}
            />
            {errors?.password && <p>{errors?.password?.message || 'Пароль должен состоять минимум из одной буквы и одной цифры'}</p>}
          </div>

        </div>
        <button
          onClick={() => navigate(STEP)}
          className="btn btn--accent btn--general login-form__submit"
          type="submit"
          disabled={!isValid}
        >
          Войти
        </button>
      </div>
      <label className="custom-checkbox login-form__checkbox">
        <input
          type="checkbox"
          id="id-order-agreement"
          {...register('userAgreement', {
            required: 'Это поля обязательно для заполнения',
          })}
        />
        <span className="custom-checkbox__icon">
          <svg width={20} height={17} aria-hidden="true">
            <use xlinkHref="#icon-tick" />
          </svg>
        </span>
        <span className="custom-checkbox__label">
          Я&nbsp;согласен с
          <Link className="link link--active-silver link--underlined" to="#">
            правилами обработки персональных данных
          </Link>
          &nbsp;и пользовательским соглашением
        </span>
      </label>
    </form>
  );
}

export default LoginForm;
