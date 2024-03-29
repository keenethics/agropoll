import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="homePage">
        <div className="title-page title-color">
          Agropoll.
          {{
            ua: ' Поділіться своїми планами',
            en: ' Share your plans',
          }[localStorage.getItem('language') || 'ua']}
        </div>
        {{
          ua: (
            <article>
              <div className="title-article">Про проект</div>
              <p>
                Наша мета — підвищити ефективність ведення сільського господарства в Україні,
                зокрема, за рахунок зменшення коливань цін на сільськогосподарську продукцію,
                яка виникає внаслідок невідповідності пропозиції до попиту.
              </p>
              <p>
                Під час планування обсягів вирощування культур, агровиробники обмежені сівозміною,
                кліматом, грунтами, наявною технікою тощо.
              </p>
              <p>
                Однак, залишається певний простір для вибору виду культури,
                і одним із аргументів виступає фінансовий чинник.
              </p>
              <p>
                Багато виробників відштовхуються від цін попереднього року,
                які часто зумовлені випадковими чинниками.
                Оскільки значна частка з них діє за схожим сценарієм,
                то часто трапляються “перекоси”: пере- або недовиробництво певних культур
                (це не стосується експортних позицій).
              </p>
              <img src="img/2-ua.png" alt="x" />
              <p>
                Agropoll призначений для публікації виробниками попередніх планів вирощування культур
                до їх остаточного затвердження, так, щоби аграрії могли визначити оптимальний перелік культур,
                відштовхуючись від планів інших виробників.
              </p>
              <p>
                Agropoll орієнтований в основному на невеликих виробників,
                які зосереджені на виробництві культур для потреб внутрішнього ринку.
              </p>

              <p>
                Робота сайту побудована на одночасному внесенні
                сільськогосподарськими виробниками інформації про хід польових робіт та плани на майбутнє.
                Система опрацьовує результат і дає змогу стежити за ходом посівної та збиральної кампаній
                практично в реальному часі, причому як в цілому по Україні, так і в окремих регіонах.
              </p>
            </article>
          ),
          en: (
            <article>
              <div className="title-article">About</div>
              <p>
                While planning sowing campaign, farmers are restricted by crops rotation,
                climate, soil type, available machinery etc.
              </p>
              <p>
                However, sometimes they have to select from a few equivalent
                (in terms of availability) positions.
              </p>
              <p>
                The problem is that the lack of information could lead to a situation
                when many farms will be sowing the same crops. Consequently,
                it may result in overproduction (and underproduction in opposite case) of some crops.
                This may negatively influence the market (especially what concerns non-export positions).
              </p>
              <img src="img/2-en.png" alt="x" />
              <p>
                Agropoll is the platform for help farmers with the forehanded planning of crops sowing.

              </p>
              <p>
                Farmers share their plans on crops sowing in advance,
                so they could see what others are planning and thus avoid of over- and underproduction.
              </p>

              <p>
                This allows to reach a more stable agricultural market,
                so neither developers will need to sell their production with lower price nor customers have to overpay.
              </p>
            </article>
          )
        }[localStorage.getItem('language') || 'ua']}

        {/*<article>
          <div className="title-article">Концепція</div>
          <div className='percent-100 display-inlBlock relative'>
            <div className="float-left percent-80">
              <p>Cитуація різкого коливання цін на окремі сільськогосподарські культури часто виникає у зв'язку із недостатньою поінформованістю сільськогосподарських виробників (особливо невеликих) щодо діяльності та планів інших господарств, наприклад, через штучно сформований ажіотаж навколо певних культур. Як наслідок — виникає явище перевиробництва таких видів продукції і ціна на них падає, часто нижче собівартості виробництва.</p>
              <p>Те ж стосується і протилежного випадку — відсутність впевненості у «перспективності» деякої культури (як правило, це трапляється на наступний рік після ситуації, описаної вище) призводить до її недовиробництва і зростання вартості через необхідність імпорту. В той же час, інші сільськогосподарські культури зазнають перевиробництва і необгрунтованого зниження цін. Тобто, в кінцевому випадку, це призводить до недоотримання прибутку аграріями.</p>
            </div>
            <div className="percent-20 float-left min-height-100">
              <div className="div-images">
                <img src="http://agromonitor.in.ua/_about/conception1.jpg" width="200"/>
              </div>
            </div>
          </div>
          <div className="percent-100 display-inlBlock relative">
            <div className="percent-80 float-left">
              <p>Концепція проекту «Agropoll» полягає в тому, що цінність інформації про вирощування сількогосподарських культур зростає в міру збільшення кількості внесених даних. Після досягнення деякого критичного значення це дає змогу здійснити узагальнення. Інформація, перестаючи бути персоналізованою, може застосовуватися для прогнозування ринку, управління посівною кампанією тощо, тобто підвищує ефективність ведення сільського господарства як окремими сільськогосподарськими виробниками, так і Державою загалом.</p>
              <p>Ще один аспект підвищення ефективності можливий за рахунок об'єднання господарств, розташованих достатньо близько, з метою більш зручного збуту вирощеної продукції — наприклад, цілком логічно вирощувати якусь певну «основну» культуру чи групу культур в деякому регіоні з точки зору логістики.</p>
              <p>Перевагою даної системи є набагато швидший обіг інформації порівняно із традиційними методами її збору, а також можливість швидкого масштабування результатів. Окрім цього, спрощується введення і контроль даних, які можна внести і відкоригувати самостійно у зручний для користувача час.</p>
            </div>
            <div className="percent-20 float-left min-height-100">
              <div className="div-images">
                <img src="http://agromonitor.in.ua/_about/conception2.jpg" width="200"/>
              </div>
            </div>

          </div>
        </article>*/}
      </div>
    );
  }
}
