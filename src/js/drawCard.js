export default class DrawCard {
  constructor(container) {
    this.container = container;
  }

  static markup(title, type, id) {
    return `<li class="card" data-type = "${type}" data-id = "${id}">
      <div class = "card-header">
        <h4>${title}</h4>
        <button class="card-delete hidden"><span></span></button>
      </div>
    </li>`;
  }

  bindToDOMCard({ title, type, id }) {
    this.container.insertAdjacentHTML('beforeend', this.constructor.markup(title, type, id));
  }
}
