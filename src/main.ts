import {postData, getData, patchData} from '../modules/http'
import {reloadTasks, setDragDrop} from '../modules/ui'
import { v4 as uuidv4 } from "uuid";

const empties = document.querySelectorAll<HTMLDivElement>(".empty");
let create: any = document.querySelector<HTMLButtonElement>(".create");
let modal: any = document.querySelector<HTMLDivElement>(".modal");
let modal_close: any = document.querySelector<HTMLButtonElement>(".x");
let add_todos: any = document.querySelector<HTMLButtonElement>(".add_todos");
let form = document.forms.namedItem("add_task") as HTMLFormElement;
let places: any = document.querySelectorAll<HTMLDivElement>(".empty .col");

setDragDrop(places)

let todos: any = [];
let temp: any = [];
let temp_id: any;


add_todos.onclick = () => {
	modal.style.display = "none";}

form.onsubmit = (event: Event) => {
		event.preventDefault();
		const fm = new FormData(form);

		const todo = {
			id: uuidv4(),
			title: fm.get("title"),
			description: fm.get("description"),
			status: fm.get("status"),
			created_at: new Date().toLocaleDateString("uz-Uz", {
				hour12: false,
			}),
		};
		console.log(todo);

		const { title, description, status } = todo;

		if (!title || !description || !status) return;

		postData("/todos", todo).then((res: any) => {
			if (res.status === 200 || res.status === 201) {
				patchData("/todos", todo).then((res: any) => {
					if (res.status === 200 || res.status === 201) {
				getData("/todos").then((res: any) => {
					if (res.status === 200 || res.status === 201) {
                        console.log(res.data);
                        
						reloadTasks({ arr: res.data, places });
					}
				});
			}
		});
			}
		});
		// patchData("/todos", todo).then((res: any) => {
		// 	if (res.status === 200 || res.status === 201) {
		// 		getData("/todos").then((res: any) => {
		// 			if (res.status === 200 || res.status === 201) {
        //                 console.log(res.data);
                        
		// 				reloadTasks({ arr: res.data, places });
		// 			}
		// 		});
		// 	}
		// });
		
	};
	getData('/todos')
    .then((res:any) => {
        if(res.status === 200 || res.status === 201) {
            reloadTasks({arr: res.data, places})
        }
    })
	
create.onclick = () => {
	modal.style.display = "flex";
};
modal_close.onclick = () => {
	modal.style.display = "none";
};
let cls_btn = document.querySelector<HTMLButtonElement>('.close_btn')
let setting: any = document.querySelector<HTMLDivElement>('.setting')

// cls_btn.onclick = () => {
// 	setting.style.width = 5%
// };