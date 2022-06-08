(()=>{"use strict";let t=(t=21)=>crypto.getRandomValues(new Uint8Array(t)).reduce(((t,e)=>t+((e&=63)<36?e.toString(36):e<62?(e-26).toString(36).toUpperCase():e>62?"-":"_")),"");class e{constructor(t,e){this.container=t,this.columnName=e}static markup(t){return`<div class="tasks-container" data-id-column="${t}">\n    <div class="tasks-header">\n      <h3 class="tasks-title">${t}</h3>\n    </div>\n    <div class="tasks-content">\n      <ul class="task-items"></ul>\n    </div>\n    <div class="tasks-footer">\n      <div class="tasks-add-card">\n        <button>\n          + \n          <span>\n            Add another card\n            <span></span>\n          </span>\n        </button>\n      </div>\n      <form class="add-task hidden">\n        <div class="wrapper-input">\n          <input type="text" class="add-task-input" placeholder="Enter text here...">\n        </div>\n        <button class="add-task-newcard btn btn-primary">Add Card</button>\n        <button class="add-task-delete">\n          <span></span>\n        </button>\n      </form>\n    </div>\n  </div>`}bindToDOM(){this.container.insertAdjacentHTML("beforeend",this.constructor.markup(this.columnName))}}class s{constructor(t){this.container=t}static markup(t,e,s){return`<li class="card" data-type = "${e}" data-id = "${s}">\n      <div class = "card-header">\n        <h4>${t}</h4>\n        <button class="card-delete hidden"><span></span></button>\n      </div>\n    </li>`}bindToDOMCard(t){let{title:e,type:s,id:n}=t;this.container.insertAdjacentHTML("beforeend",this.constructor.markup(e,s,n))}}class n{getCards(){return JSON.parse(localStorage.getItem("cards"))||[]}saveCards(t){localStorage.setItem("cards",JSON.stringify(t))}}const a=document.querySelector(".board");new class{constructor(t){this.container=t,this.state=[],this.saveState=new n}init(){this.bindToDOM(),this.toDoColumn=new e(this.boardContainer,"to do"),this.toDoColumn.bindToDOM(),this.inProgressColumn=new e(this.boardContainer,"in progress"),this.inProgressColumn.bindToDOM(),this.doneColumn=new e(this.boardContainer,"done"),this.doneColumn.bindToDOM(),this.state=this.saveState.getCards(),this.loadState(this.state),this.registerEvents()}static get markup(){return'<div class="task-manager"></div>\n    '}get boardContainer(){return this.container.querySelector(".task-manager")}bindToDOM(){this.container.insertAdjacentHTML("beforeend",this.constructor.markup)}registerEvents(){const t=document.querySelectorAll("ul"),e=this.container.querySelectorAll(".task-items"),s=this.container.querySelectorAll(".add-task");t.forEach((t=>{t.addEventListener("mouseover",(t=>{"LI"===t.target.tagName&&(this.showDeleteButton(t),console.log(t))})),t.addEventListener("mouseout",(t=>{t.relatedTarget.classList.contains("card-header")||"SPAN"===t.relatedTarget.tagName||"LI"===t.target.tagName&&(this.hideDeleteButton(t),console.log(t.target))}))})),this.container.addEventListener("mousedown",(t=>{const{target:e}=t;"SPAN"!==e.tagName&&e.closest("li")&&this.onMouseDown(t)})),this.container.addEventListener("mouseup",(t=>this.onMouseUp(t))),this.container.addEventListener("mousemove",(t=>this.onMouseMove(t))),e.forEach((t=>t.addEventListener("click",(t=>{const{target:e}=t;(e.classList.contains("card-delete")||"SPAN"===e.tagName)&&this.deleteCard(t)})))),s.forEach((t=>t.addEventListener("submit",(t=>{this.createNewCard(t),this.onClickCloseAddCard(t)}))));const n=this.boardContainer.querySelectorAll(".tasks-add-card button"),a=this.boardContainer.querySelectorAll(".add-task-delete");n.forEach((t=>t.addEventListener("click",(t=>this.onClickAddNewCard(t))))),a.forEach((t=>t.addEventListener("click",(t=>this.onClickCloseAddCard(t)))))}onMouseDown(t){t.preventDefault(),document.body.style.cursor="grabbing";const e=t.target.closest("li");this.cloneElement=e.cloneNode(!0);const{width:s,height:n,left:a,top:o}=e.getBoundingClientRect();this.cloneElement.classList.add("dragged"),this.cloneElement.style.width=`${s}px`,this.cloneElement.style.height=`${n}px`,document.body.appendChild(this.cloneElement),this.coordX=t.clientX-a,this.coordY=t.clientY-o,this.cloneElement.style.top=`${o}px`,this.cloneElement.style.left=`${a}px`,this.currentElement=e,this.currentElement.classList.add("hidden")}onMouseMove(t){t.preventDefault(),this.cloneElement&&(this.cloneElement.style.left=t.pageX-this.coordX+"px",this.cloneElement.style.top=t.pageY-this.coordY+"px")}onMouseUp(t){if(t.preventDefault(),document.body.style.cursor="default",!this.currentElement||!this.cloneElement)return;const e=document.elementFromPoint(t.clientX,t.clientY).closest("li"),s=t.target.closest(".tasks-container");if(!s)return this.cloneElement.remove(),void this.currentElement.classList.remove("hidden");const n=s.querySelector(".task-items");this.currentElement.dataset.type=s.dataset.idColumn,n.insertBefore(this.currentElement,e),this.state.find((t=>t.id===this.currentElement.dataset.id)).type=this.currentElement.dataset.type,this.saveState.saveCards(this.state),this.currentElement.classList.remove("hidden"),this.cloneElement.remove(),this.cloneElement=null}deleteCard(t){const e=t.target.closest("li"),s=this.state.findIndex((t=>t.id===e.dataset.id));this.state.splice(s,1),this.saveState.saveCards(this.state),e.remove()}createNewCard(e){e.preventDefault();const{currentTarget:n}=e;console.log({currentTarget:n});const a=n.closest(".tasks-container"),o=a.querySelector(".task-items"),r=n[0].value,i=new s(o),d={title:r,type:a.dataset.idColumn,id:t()};console.log(d),i.bindToDOMCard(d),this.state.push(d),this.saveState.saveCards(this.state),n[0].value=""}onClickCloseAddCard(t){t.preventDefault();const e=t.currentTarget.closest(".tasks-container"),s=e.querySelector(".tasks-add-card"),n=e.querySelector(".add-task");s.classList.toggle("hidden"),n.classList.toggle("hidden")}onClickAddNewCard(t){const e=t.currentTarget.closest(".tasks-container"),s=e.querySelector(".tasks-add-card"),n=e.querySelector(".add-task");s.classList.toggle("hidden"),n.classList.toggle("hidden")}loadState(t){t.forEach((t=>{const e=this.container.querySelector(`.tasks-container[data-id-column="${t.type}"]`).querySelector(".task-items");new s(e).bindToDOMCard(t),console.log(t.type)}))}showDeleteButton(t){t.target.querySelector("button").classList.remove("hidden")}hideDeleteButton(t){t.target.querySelector("button").classList.add("hidden")}}(a).init()})();