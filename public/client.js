const container = document.querySelector('#container');

class ColStak {
  constructor() {
    this.cols = [];
    this.count = 0;
  }

  push(col) {
    this.cols[this.count] = col;
    this.count += 1;
  }

  clear() {
    this.cols = [];
    this.count = 0;
  }

  getShort() {
    const minHeight = Math.min(...this.cols.map((col) => col.height), Infinity);
    return this.cols.find((col) => col.height === minHeight);
  }

  getLong() {
    const maxHeight = Math.max(...this.cols.map((col) => col.height), 0);
    return this.cols.find((col) => col.height === maxHeight);
  }

  updateShort(height) {
    const minHeight = Math.min(...this.cols.map((col) => col.height), Infinity);
    const index = this.cols.findIndex((col) => col.height === minHeight);
    this.cols[index] = {
      ...this.cols[index],
      height: this.cols[index].height + height,
    };
  }
}

const createMasonary = (container, childWidth = 250, gap = 20) => {
  let itemWidth;

  if (container.parentElement.getBoundingClientRect().width < 530) {
    itemWidth = container.parentElement.getBoundingClientRect().width / 2;
  } else {
    itemWidth = childWidth;
  }

  const containerParentWidth = container.getBoundingClientRect().width;

  const colCount = Math.floor(containerParentWidth / itemWidth);

  const columns = new ColStak();

  for (var i = 0; i < colCount; i++) {
    columns.push({
      height: 0,
      left: i * itemWidth + i * gap,
    });
  }

  for (var j = 0; j < container.children.length; j++) {
    container.children[j].style.width = itemWidth + 'px';
    container.children[j].style.transitionDelay = `${30 * j}ms`;

    const itemLeft = columns.getShort().left + 'px';
    const itemTop = columns.getShort().height + 'px';

    container.children[j].style.top = itemTop;
    container.children[j].style.left = itemLeft;

    container.children[j].style.opacity = 1;
    container.children[j].style.transform = 'translateY(0)';

    const itemheight = Math.floor(
      container.children[j].getBoundingClientRect().height
    );

    columns.updateShort(itemheight + gap);

    container.style.height = columns.getLong().height + 'px';
    container.style.width = columns.count * itemWidth + 'px';
  }
};

const noteButtonClicked = (e) => {
  alert(e.target.id);
};

const createNote = (note) => {
  const noteElem = document.createElement('div');
  noteElem.classList = 'note-item';
  noteElem.id = note._id;

  const noteBody = document.createElement('div');
  noteBody.classList = 'note-body';
  noteBody.innerText = note.body;

  const noteHeader = document.createElement('div');
  noteHeader.classList = 'note-header';

  const noteTag = document.createElement('span');
  noteTag.className = 'note-tag';
  noteTag.innerText = note.tag.name;
  noteTag.style.color = note.tag.color;
  noteHeader.appendChild(noteTag);

  const noteButton = document.createElement('button');
  noteButton.classList = 'note-button';
  noteButton.id = note._id;
  noteButton.innerText = 'id';
  noteButton.addEventListener('click', noteButtonClicked);
  noteHeader.appendChild(noteButton);

  const noteFooter = document.createElement('div');
  noteFooter.classList = 'note-footer';

  note.otherTags.forEach((tag) => {
    const otherTag = document.createElement('span');
    otherTag.className = 'other-tag';
    otherTag.innerText = tag.name;
    otherTag.style.color = tag.color;

    noteFooter.appendChild(otherTag);
  });

  noteElem.appendChild(noteHeader);
  noteElem.appendChild(noteBody);
  noteElem.appendChild(noteFooter);

  container.appendChild(noteElem);
};

const app = async () => {
  const res = await fetch('./notes');
  const notes = await res.json();

  notes.forEach((note) => createNote(note));

  createMasonary(container);
};

app();
