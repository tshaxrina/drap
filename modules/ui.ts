// type reloadTasksProps = {
//     arr: Array<[{status: string | number}]>;
//     places: Array<HTMLElement>;
// };
// export function reloadTasks({ arr, places}: reloadTasksProps) {
//     places.forEach((el) => (el.innerHTML =""));

//     for (let item of arr) {
//         console.log(item.status);
        
//         places[item.status].innerHTML += `
//         <div class="card" draggable="true">
//             <div class="title">${item.title}</div>
//             <div class="description">${item.description}</div>
//           </div>`;
//     }
// }

type Item = {
	status: number;
	title: string;
	description: string;
};

type reloadTasksProps = {
	arr: Array<Item>;
	places: Array<any>;
};

export function reloadTasks({ arr, places }: reloadTasksProps) {
	places.forEach((el) => (el.innerHTML = ""));

	for (let item of arr) {
		const card = document.createElement("div");
		const title = document.createElement("span");
		const description = document.createElement("p");

		card.classList.add("card");
		title.classList.add("card-header");
		description.classList.add("card-description");
		card.draggable = true;

		title.innerHTML = item.title;
		description.innerHTML = item.description;

		card.append(title, description);
		places[item.status].append(card);

		card.ondragstart = function () {
			card.classList.add("hold");
			setTimeout(() => (card.className = "invisible"), 0);
		};
		card.ondragend = () => {
			card.className = "card";
		};
	}
}

export function setDragDrop(places: any) {
	for (let item of places) {
		item.ondragover = (event: DragEvent) => {
			event.preventDefault();
            item.parentElement.classList.add("hovered");
		};
		item.ondragenter = (event: DragEvent) => {
			event.preventDefault();
			places.classList.add("hovered");
		};
		item.ondragleave = () => {
			item.parentElement.className = "empty";
		};
		item.ondrop = () => {
			item.parentElement.className = "empty";
			let selectedCard = document.querySelector('.invisible')
			item.append(selectedCard)
		};
	}
}

