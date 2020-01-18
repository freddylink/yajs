window.onload = () => {
	const FORM_WRAPPER = document.querySelector(`.column_type_input`);
	const ratingArray = [];
	let countedRating = 20;

  const renderSearch = (allItemsData) => {
    PageEnum.SiteWrapper.SEARCH.innerHTML = ``;
    const searchComponent = new Search();

    PageEnum.SiteWrapper.SEARCH.appendChild(searchComponent.render());
    searchComponent.onChange = (value) => {
      const filteredItems = allItemsData.filter((currentItem) => currentItem._names.includes(value));
      PageEnum.SiteWrapper.rating.innerHTML = ``;
      if (value === ``) {
        ratingRender(countedRating, allItemsData);
      } else {
        ratingUpdate(filteredItems);
      }
    };
  };

  const ratingRender = (ratingAmount, ratingArray) => {
    for (let i = 0; i < ratingAmount; i++) {
      ratingArray[i] = new PersonRating(returnRandomData());
    }
    ratingUpdate(ratingArray);
  };

  const ratingUpdate = (ratingArray) => {
    ratingArray.forEach((item) => {
      PageEnum.SiteWrapper.rating.appendChild(item.render());
    });
    if (ratingArray.length === 0) {
      PageEnum.SiteWrapper.rating.innerHTML = `Rating list is empty`
    }
  };

	const renderForm = () => {
		const formComponent = new Form();
		FORM_WRAPPER.appendChild(formComponent.render());

		formComponent.onSubmit = (evt) => {
			evt.preventDefault();
			const name = document.querySelector(`input[name=name]`).value;
			const cat = document.querySelector(`input[name=cat]`).value;
			const rest = document.querySelector(`input[name=rest]`).value;
			const money = document.querySelector(`input[name=money]`).value;
			const Man = new Person(name);
			if (cat === 'yes') {
				Man.hasCat();
			}
			if (rest === 'yes') {
				Man.hasRest();
			}
			if (money === 'yes') {
				Man.hasMoney();
			}
			Man.isSunny()
				.then((happiness) => {
					Man._valueElement.innerHTML = name;
					if (happiness === 4) {
						Man._iconElement.innerHTML = '😆';
					} else if (happiness === 3 || happiness === 2) {
						Man._iconElement.innerHTML = '😐';
					} else {
						Man._iconElement.innerHTML = '☹️';
					}
				});
		}
	};

	renderForm();
  renderSearch(ratingArray); // съехал вызов метода
	ratingRender(countedRating, ratingArray);
};

/*
 A--Корректно ли реализован Fetch, должным ли образом обрабатываются собираемые и получаемые данные?
 	1. Введенные данные никак не влияют на получаемый результат. На результат влияет погода в Москве.
 		res.main.temp - 273 > 15 - в этом выражении вместо 15 можно было бы использовать побитовое сложение вариантов ответа
 		на задаваемые вопросы, например.
 		hasCat(),hasMoney(),hasRest() - возвращают инкремент happines - в любом случае.
 	2. Ответ от сервера никак не анализиуется. Получается если серевер не пришлет ответ, то пользователь так и не дождется
 	 	реакции системы на запрос. Необходиом проверять статус ответа от сервера ( 200 ).
 	3. Ошибки от сервера {"cod":401, "message": "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."}
 	 	должна логироваться напримепр в файле, чтобы понимать, что в нашем приложении какая-то ошибка.
 	 	Такая ошибка может произойти, если вдруг ключ стад недействительным.
 	4. Если ответ, не получен, то пользователю должно показываться уведомление, что сервис временно не работает.
 	5. console.log(this._happiness); - вывода в консоль не должно присутствовать, вероятно не убрано при отладке
 	6.  .then(res => res.json())
 		.then((res) => {...  - res, res - вводят в путаницу, переменные должны говорить о том, что они в себе хранят.
 		Например, в первом случае  - это  response, во-втором weatherApiData
 	7. Заполняемость данных в форме никак не валидируется. Кнопка для отправки запроса доступна без ввода данных.
	8. if (res.main.temp - 273 > 15) {
 		return this._happiness++;
 		}  - не хвататет else
 Б--Имеет ли код уязвимости, если да - то какие?
 	1. Строка поиска при нажатии Enter - открывает доступ к директории Windows со всеми файлами.
 В--Корректно ли работает реализованный функционал? Соответствует ли он поставленной перед студентом задаче?
 	1. После получения результата, форма ввода данных должна очищаться.
 	2. Поиск не работает, забыт байндинг this._onSearchChange = this._onSearchChange.bind(this);
 	3. При работающем поиске - поиск является регистрозависимым.
 	4. При работе с поиском, форма ввода скачет. Ее положение зависит от высоты блока рейтингов.
 	5. При очистке строки поиска список заново генерируются новые рандомные данные, хотелось бы работать с одним списком.
 Г--Насколько хорошо организован и чист код: как его можно улучшить, изменить, упростить?
 	1. Все объекты вынести в отдельную папку, enum в своей папке,  utils в своей папке
 	2. Сожержание script.js - это тоже объет с методами, которые можно вызывать. Сейчас это набор функций
 Д--Корректно ли используются моковые данные, все ли ок с названием переменных, их расположением в коде/файлах?
 	1. const Man = new Person(name); - дискриминация по гендерному признаку :)
 	2.  const cat, const rest, const money - эти переменные могут принимать только два значение true/false. С этой точки
 		зрения можно дать название для них isHaveCat, isHaveRest, isMoneyEnough, тем самым это упростит чтение кода для
 		другого разработчика.
 	3. happiness === 3 || happiness === 2  - можно сравнивать не с числовыми значениями уровень счастья, а с таким же
 		enum. Happy = 3, Normal = 2, Sad = 1.
 Е--Как обстоят дела с методами внутри классов? Возможно ли что-то упростить или реорганизовать?
	1. Не реализован метод removeItem() в Component.js
	2. Для генерации случайных рейтингов можно использовать метод getRandomNumber(), который реализован в utils-function,
		но требует доработок по возвращению значений генератора.
*/

