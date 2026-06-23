import { Icon } from '../shared/Icon'
import './LoginDialog.css'

export function LoginDialog({ closeOverlay }: { closeOverlay: () => void }) {
  return (
    <div className="modal-layer">
      <section className="login-dialog">
        <button
          className="modal-close"
          type="button"
          aria-label="Close login"
          onClick={closeOverlay}
        >
          <Icon name="x" />
        </button>
        <h2>Вход в аккаунт</h2>
        <p>Войдите для сохранения заказов</p>
        <button className="google-button" type="button">
          <Icon name="google" />
          Войти через Google
        </button>
        <div className="or-line">
          <span>или</span>
        </div>
        <input placeholder="Email" type="email" />
        <label className="password-field">
          <input placeholder="Пароль" type="password" />
          <Icon name="eye" />
        </label>
        <div className="login-row">
          <label>
            <input type="checkbox" /> Запомнить
          </label>
          <button type="button">Забыли пароль?</button>
        </div>
        <button className="login-submit" type="button">
          Войти
        </button>
        <button className="create-account" type="button">
          <Icon name="user" />
          Создать аккаунт
        </button>
      </section>
    </div>
  )
}
