// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Crops, Groups } from '/imports/api/crops/crops.js';

Meteor.startup(() => {
  // if the Crops collection is empty
  if (Crops.find().count() === 0) {
    const groups = [
      [0, "Зернові та зернобобові культури"],
      [1, "Картопля та овоче-баштанні культури"],
      [2, "Технічні культури"],
      [3, "Кормові культури"],
    ];

    groups.forEach(group => Groups.insert({
      id: group[0],
      name: group[1],
    }));

    const crops = [
      [10, 0, "Пшениця озима", 40.2],
      [20, 0, "Жито озиме", 25.8],
      [30, 0, "Ячмінь озимий", 30.9],
      [40, 0, "Пшениця яра", 38.1],
      [50, 0, "Жито яре", 25.8],
      [60, 0, "Ячмінь ярий", 29.7],
      [70, 0, "Овес", 25.1],
      [80, 0, "Кукурудза на зерно", 61.6],
      [90, 0, "Гречка", 12.2],
      [100, 0, "Рис", 50.0],
      [110, 0, "Просо", 18.0],
      [120, 0, "Горох", 23.4],
      [130, 0, "Квасоля", 15.1],
      [200, 0, "Інші зернові та зернобобові культури", 0],

      [210, 1, "Картопля", 176.4],
      [220, 1, "Капуста всяка (крім цвітної)", 263.5],
      [230, 1, "Капуста цвітна", 123.2],
      [240, 1, "Огірки", 145.2],
      [250, 1, "Помідори", 250.1],
      [260, 1, "Буряки столові", 218.9],
      [270, 1, "Морква столова", 203.3],
      [280, 1, "Цибуля на ріпку", 188.5],
      [290, 1, "Часник", 87.4],
      [300, 1, "Зелений горошок", 47.8],
      [310, 1, "Кабачки", 185.8],
      [320, 1, "Гарбузи столові", 224.5],
      [330, 1, "Баклажани", 130.2],
      [340, 1, "Перець солодкий", 115.5],
      [350, 1, "Перець гіркий", 115.5],
      [360, 1, "Цибуля зелена", 101.5],
      [370, 1, "Кавуни", 94.4],
      [380, 1, "Дині", 71.3],
      [400, 1, "Інші овоче-баштанні культури", 0],

      [410, 2, "Цукрові буряки (фабричні)", 476.5],
      [420, 2, "Соняшник на зерно", 19.4],
      [430, 2, "Соя", 21.6],
      [440, 2, "Ріпак озимий", 25.7],
      [450, 2, "Ріпак ярий", 18.0],
      [460, 2, "Льон-кудряш", 12.3],
      [470, 2, "Гірчиця", 8.3],
      [500, 2, "Інші технічні культури", 0],

      [600, 3, "Різні кормові культури", 0],
    ];

    crops.forEach(crop => Crops.insert({
      id: crop[0],
      name: crop[2],
      groupId: crop[1],
      avgCapacity: crop[3],
    }));

  }
});
