export const StuffListPage = () => {
  const stuffs = [
    {
      name: 'Первый проект',
      tags: ['тег1', 'тег2'],
      description:
        'Крупное многострочное описание проекта предполагающее некоторое количество текста',
    },
    {
      name: 'Второй проект',
      tags: ['тег3', 'тег4'],
      description:
        'Крупное многострочное описание проекта предполагающее некоторое количество текста',
    },
    {
      name: 'Третий проект',
      tags: ['тег5', 'тег6'],
      description:
        'Крупное многострочное описание проекта предполагающее некоторое количество текста',
    },
  ];

  return (
    <div>
      <div>
        <h1>stuff page</h1>
        <p>Список проектов</p>
      </div>
      <div>
        {stuffs.map((stuff) => {
          return (
            <div key={stuff.name}>
              <h2>{stuff.name}</h2>
              <p>{stuff.tags.join(' | ')}</p>
              <p>{stuff.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
