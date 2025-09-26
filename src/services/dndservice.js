export default class DndService {
  constructor({ onMove = null }) {
    this.dropZone = null;
    this.draggable = null;
    this.dragItem = null;
    this.selectedIndex = -1;
    this.targetIndex = -1;
    if (onMove) this.moveEvent = onMove;
  }

  findDragAndDropElementIndex(element) {
    const listElement = this.dropZone.querySelectorAll('li');
    if (!listElement) return;
    const elementArr = [...listElement];
    const findIdx = elementArr.indexOf(element);
    return findIdx;
  }

  resetDropGuide() {
    const list = this.dropZone.querySelectorAll('li');
    if (list) {
      list.forEach(element => {
        element.classList.remove('top-selected');
        element.classList.remove('bottom-selected');
      });
    }
  }

  updateDropGuide(evt) {
    if (!(evt.target instanceof HTMLLIElement)) return;
    this.resetDropGuide();
    const isTopFocus = evt.offsetY < evt.target.offsetHeight / 2;
    if (isTopFocus) {
      evt.target.classList.add('top-selected');
      evt.target.classList.remove('bottom-selected');
    } else {
      evt.target.classList.remove('top-selected');
      evt.target.classList.add('bottom-selected');
    }
  }

  onDropCancel() {
    if (!this.dragItem) return;
    this.dropZone.classList.remove('drag-item');
    this.dropZone.removeChild(this.dragItem);
    this.dragItem = null;
  }

  onDropHandler(element) {
    const isBehind = this.dropZone.querySelector('li.top-selected') !== null;
    this.targetIndex = this.findDragAndDropElementIndex(element);
    this.resetDropGuide();

    if (!this.dragItem) return;
    this.onDropCancel();
    if (this.selectedIndex !== this.targetIndex) {
      const moveIndex = isBehind
        ? this.selectedIndex > this.targetIndex
          ? this.targetIndex
          : this.targetIndex - 1
        : this.selectedIndex > this.targetIndex
          ? this.targetIndex + 1
          : this.targetIndex;
      this.moveEvent({
        selectedIndex: this.selectedIndex,
        targetIndex: moveIndex > 0 ? moveIndex : 0
      });
    }
  }

  dragAndDrop() {
    this.dropZone.addEventListener('mousedown', evt => {
      if (!(evt.target instanceof HTMLLIElement)) return;
      this.dragItem = evt.target.cloneNode(true);
      this.selectedIndex = this.findDragAndDropElementIndex(evt.target);
      this.dragItem.style.display = 'none';
      this.dragItem.classList.add('drag-and-drop');
      this.dropZone.classList.add('drag-item');
      this.dropZone.appendChild(this.dragItem);
    });

    this.dropZone.addEventListener('mousemove', evt => {
      if (!this.dragItem) return;
      const posX = evt.clientX;
      const posY = evt.clientY;
      this.dragItem.style.left = posX + 'px';
      this.dragItem.style.top = posY + 'px';
      this.dragItem.style.display = 'block';
      this.updateDropGuide(evt);
    });

    this.dropZone.addEventListener('mouseleave', () => {
      this.onDropCancel();
    });

    this.dropZone.addEventListener('mouseup', evt => {
      this.onDropHandler(evt.target);
    });
  }

  setDropZone(element) {
    if (!element) return;
    this.dropZone = element;
    this.dragAndDrop();
  }
}
