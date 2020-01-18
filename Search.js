class Search extends Component {
    constructor() {
        super();
        this._onChange = null;
        this._onSearchChange = this._onSearchChange.bind(this);
    }

    get template() {
        return `<input type="text" name="search" placeholder="Search">
      <button type="submit" class="visually-hidden">Search</button>`.trim();
    }

    removeEventListener() {
        this._element
            .removeEventListener(`keydown`, this._onSearchChange);
    }

    _onSearchChange(event) {
        if (typeof this._onChange === `function`) {
            this._onChange(event.target.value);
        }
    }

    set onChange(fn) {
        this._onChange = fn;
    }

    setEventListener() {
        this._element
            .addEventListener(`keyup`, this._onSearchChange);
    }

}
