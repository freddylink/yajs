class Form extends Component {
    constructor() {
        super();
        this._element = null;

        this._onSubmit = this._onSubmit.bind(this);
    }

    setEventListener() {
      this._submit = this._element.querySelector(`.columns__submit`);
      this._submit.addEventListener(`click`, this._onSubmit);
    }

    get template() {
        return `<form>
                    <h1 class="column__title">
                        Введите данные
                    </h1>
                    <h2 class="column__heading">
                        Имя?
                    </h2>
                    <input type="text" name="name">
                    <h2 class="column__heading">
                        Есть кот?
                    </h2>
                    <label class="column__label">
                        <input type="radio" value="yes" name="cat">
                        <span>Да</span>
                    </label>
                    <label class="column__label">
                        <input type="radio" value="no" name="cat">
                        <span>Нет</span>
                    </label>
                    <h2 class="column__heading">Отдыхал недавно?</h2>
                    <label class="column__label">
                        <input type="radio" value="yes" name="rest">
                        <span>Да</span>
                    </label>
                    <label class="column__label">
                        <input type="radio" value="no" name="rest">
                        <span>Нет</span>
                    </label>
                    <h2 class="column__heading">Денег ок?</h2>
                    <label  class="column__label">
                        <input type="radio" value="yes" name="money">
                        <span>Да</span>
                    </label>
                    <label class="column__label">
                        <input type="radio" value="no" name="money">
                        <span>Нет</span>
                    </label>
                    <button class="columns__submit">
                        HAPPINESS RATE
                    </button>
		    	</form>`.trim();
    }

    set onSubmit(fn) {
        this._onSubmit = fn;
    }
    _onSubmit(evt) {
        evt.preventDefault();
        return typeof this._onSubmit === `function` && this._onSubmit(evt);
    }
    removeEventListener() {
        this._submit.removeEventListener(`click`, this._onSubmit);
    }
}
