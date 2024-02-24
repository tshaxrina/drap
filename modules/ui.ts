type reloadTasksProps = {
    arr: Array<[{status: string | number}]>;
    places: Array<any>;
};
export function reloadTasks({ arr, places}: reloadTasksProps) {
    places.forEach((el) => (el.innerHTML =""));

    for (let item of arr) {
        places[item.status].innerHTML += `
        <div class="card" draggable="true">
            <div class="title">${item.title}</div>
            <div class="description">${item.description}</div>
          </div>`;
    }
}