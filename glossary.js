/* Shared glossary tooltips / Спільні підказки-глосарій. Usage: GL.scan(el) ; GL.lang = () => "uk"|"en" */
(function(){
"use strict";
var D={
"DPD":["Days Past Due — кількість днів прострочки платежу. Основа для кошиків 1–30, 31–60, 61–90, 90+.","Days Past Due — number of days a payment is overdue. Basis for the 1–30, 31–60, 61–90, 90+ buckets."],
"NPL":["Non-Performing Loans — непрацюючі кредити; зазвичай прострочка понад 90 днів. NPL ratio = NPL / валовий портфель.","Non-Performing Loans — usually 90+ days past due. NPL ratio = NPL / gross portfolio."],
"roll rate":["Частка боргу (або рахунків), що перейшла з одного кошика прострочки в наступний за період.","Share of balance (or accounts) that moved from one delinquency bucket to the next over a period."],
"vintage":["Когорта карток, виданих в одному періоді. Вінтажний аналіз порівнює поведінку когорт за віком.","A cohort of cards issued in the same period. Vintage analysis compares cohorts by age."],
"CoR":["Cost of Risk — вартість ризику: резерви/списання за період, поділені на середній портфель (річна, у %).","Cost of Risk — provisions/write-offs over the period divided by average portfolio (annualised, %)."],
"PD":["Probability of Default — імовірність дефолту за горизонт (12 міс. або весь строк).","Probability of Default over a horizon (12 months or lifetime)."],
"LGD":["Loss Given Default — частка експозиції, що втрачається після дефолту, з урахуванням повернень.","Loss Given Default — share of exposure lost after default, net of recoveries."],
"EAD":["Exposure at Default — сума під ризиком на момент дефолту (для карток — з урахуванням невикористаного ліміту).","Exposure at Default — amount at risk when default occurs (for cards includes expected drawdown of the unused limit)."],
"ECL":["Expected Credit Loss = PD × LGD × EAD. Резерв за IFRS 9.","Expected Credit Loss = PD × LGD × EAD. The IFRS 9 allowance."],
"IFRS 9":["Стандарт обліку фінінструментів: резерви за очікуваними збитками, три стадії кредитної якості.","Financial instruments accounting standard: expected-loss provisioning with three credit stages."],
"EAR":["Effective Annual Rate — ефективна річна ставка з урахуванням капіталізації відсотків.","Effective Annual Rate — annual rate including compounding."],
"APR":["Annual Percentage Rate — номінальна річна відсоткова ставка.","Annual Percentage Rate — nominal yearly interest rate."],
"grace period":["Пільговий період — час, коли відсотки за покупки не нараховуються за умови погашення всієї суми.","Grace period — time during which purchases accrue no interest if the full balance is repaid."],
"пільговий період":["Час, коли відсотки за покупки не нараховуються за умови погашення всієї суми.","Time during which purchases accrue no interest if the full balance is repaid."],
"transactor":["Клієнт, який щомісяця погашає борг повністю в пільговий період; приносить інтерчейндж, не відсотки.","Cardholder who repays in full every month within the grace period; earns interchange, not interest."],
"revolver":["Клієнт, що тримає борг і платить відсотки; основне джерело відсоткового доходу, але й ризику.","Cardholder who carries a balance and pays interest; main source of interest income and of risk."],
"interchange":["Міжбанківська комісія, яку банк-емітент отримує з кожної безготівкової операції.","Fee the issuing bank earns from the merchant side on each card payment."],
"інтерчейндж":["Міжбанківська комісія, яку банк-емітент отримує з кожної безготівкової операції.","Fee the issuing bank earns from the merchant side on each card payment."],
"utilization":["Використання ліміту = залишок боргу / кредитний ліміт.","Limit utilisation = balance / credit limit."],
"charge-off":["Списання безнадійного боргу з балансу (залишається право стягнення).","Writing an uncollectible balance off the books (collection rights remain)."],
"cure rate":["Частка прострочених рахунків, що повернулись у нормальний стан.","Share of delinquent accounts that return to current."],
"unit economics":["Економіка одиниці: дохід і витрати в розрахунку на одну картку/клієнта.","Revenue and cost per card/customer."],
"economics":["Дохід і витрати в розрахунку на одну картку/клієнта.","Revenue and cost per card/customer."],
"break-even":["Точка беззбитковості — обіг, за якого дохід картки покриває її витрати.","Spend level at which card revenue covers its costs."],
"беззбитковості":["Обіг, за якого дохід картки покриває її витрати.","Spend level at which card revenue covers its costs."],
"window function":["Віконна функція рахує значення по «вікну» рядків, не згортаючи їх (ROW_NUMBER, LAG, SUM OVER).","Computes a value over a window of rows without collapsing them (ROW_NUMBER, LAG, SUM OVER)."],
"віконні функції":["Віконна функція рахує значення по «вікну» рядків, не згортаючи їх (ROW_NUMBER, LAG, SUM OVER).","Computes a value over a window of rows without collapsing them (ROW_NUMBER, LAG, SUM OVER)."],
"віконна функція":["Обчислює значення по «вікну» рядків, не згортаючи їх (ROW_NUMBER, LAG, SUM OVER).","Computes a value over a window of rows without collapsing them."],
"CTE":["Common Table Expression — іменований підзапит WITH …, що робить запит читабельним.","Common Table Expression — a named WITH … subquery that makes queries readable."]
};
var keys=Object.keys(D).sort(function(a,b){return b.length-a.length});
function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
var re=new RegExp("(^|[^A-Za-zА-Яа-яІіЇїЄєҐґ0-9_])("+keys.map(esc).join("|")+")(?![A-Za-zА-Яа-яІіЇїЄєҐґ0-9_])","i");
var SKIP={SCRIPT:1,STYLE:1,CODE:1,PRE:1,INPUT:1,TEXTAREA:1,BUTTON:1,SELECT:1,OPTION:1,A:1,H1:1,ABBR:1};
var GL={lang:function(){return document.documentElement.lang==="en"?"en":"uk"}};
function lookup(k){var low=k.toLowerCase();for(var i=0;i<keys.length;i++)if(keys[i].toLowerCase()===low)return D[keys[i]];return null}
GL.scan=function(root){
  if(!root)return;var seen={};
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
    for(var p=n.parentNode;p&&p!==root.parentNode;p=p.parentNode){if(SKIP[p.nodeName]||(p.classList&&(p.classList.contains("gl")||p.classList.contains("nogl"))))return NodeFilter.FILTER_REJECT}
    return re.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
  var nodes=[];while(w.nextNode())nodes.push(w.currentNode);
  nodes.forEach(function(n){
    var txt=n.nodeValue,out=document.createDocumentFragment(),changed=false,m;
    while((m=re.exec(txt))){
      var term=m[2],low=term.toLowerCase();
      if(seen[low]){out.appendChild(document.createTextNode(txt.slice(0,m.index+m[0].length)));txt=txt.slice(m.index+m[0].length);continue}
      seen[low]=1;changed=true;
      out.appendChild(document.createTextNode(txt.slice(0,m.index)+m[1]));
      var s=document.createElement("span");s.className="gl";s.setAttribute("data-gl",term);s.tabIndex=0;s.textContent=term;out.appendChild(s);
      txt=txt.slice(m.index+m[0].length);
    }
    if(changed){out.appendChild(document.createTextNode(txt));n.parentNode.replaceChild(out,n)}
  });
};
var tip;
function show(el){
  var d=lookup(el.getAttribute("data-gl"));if(!d)return;
  if(!tip){tip=document.createElement("div");tip.className="gltip";tip.setAttribute("role","tooltip");document.body.appendChild(tip)}
  tip.textContent=d[GL.lang()==="en"?1:0];tip.style.display="block";
  var r=el.getBoundingClientRect(),tw=Math.min(300,window.innerWidth-16);tip.style.maxWidth=tw+"px";
  var x=Math.max(8,Math.min(window.innerWidth-tw-8,r.left)),y=r.bottom+6;
  tip.style.left=x+"px";tip.style.top=(y+window.scrollY)+"px";
}
function hide(){if(tip)tip.style.display="none"}
document.addEventListener("mouseover",function(e){var t=e.target.closest&&e.target.closest(".gl");if(t)show(t)});
document.addEventListener("mouseout",function(e){if(e.target.closest&&e.target.closest(".gl"))hide()});
document.addEventListener("focusin",function(e){var t=e.target.closest&&e.target.closest(".gl");if(t)show(t)});
document.addEventListener("focusout",hide);
document.addEventListener("click",function(e){var t=e.target.closest&&e.target.closest(".gl");if(t)show(t);else hide()});
var st=document.createElement("style");
st.textContent=".gl{border-bottom:1px dotted currentColor;cursor:help}.gl:focus{outline:2px solid #0b6bcb;outline-offset:1px}.gltip{position:absolute;z-index:9999;display:none;background:#16202c;color:#fff;font:13px/1.45 system-ui,sans-serif;padding:8px 10px;border-radius:8px;box-shadow:0 4px 14px rgba(0,0,0,.3);pointer-events:none}";
document.head.appendChild(st);
GL.terms=D;window.GL=GL;
})();
