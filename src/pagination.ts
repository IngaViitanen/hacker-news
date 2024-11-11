import { getArticlesAndRender } from "./main";

const paginationNumbersEl = document.querySelector<HTMLDivElement>("#paginationNumbers")!;
export const nextBtnEl = document.querySelector<HTMLButtonElement>("#nextBtn")!;
export const prevBtnEl = document.querySelector<HTMLButtonElement>("#prevBtn")!; // TODO: hide buttons before search res and make prev button disabled if on first page, same with next button if on last page


export const renderPagination = (paginationAmount: number[]) => {
    const searchParams = new URLSearchParams(window.location.search)
    let currentPage = Number(searchParams.get('page'))
    let start = currentPage -3
    let end = currentPage +3
    let slicedArray: number[] = []

    if (end > paginationAmount.length) {
        start -= (end - paginationAmount.length);
        end = paginationAmount.length;
        return slicedArray = paginationAmount.slice(start, end);
    }
    if (start <= 0) {
        end += ((start - 1) * (-1));
        start = 0;
        slicedArray = paginationAmount.slice(start, end);
    }

    slicedArray = paginationAmount.slice(start, end);

    paginationNumbersEl.innerHTML = slicedArray.map((page) => {
      return `<button class="pageNumberBtn ${currentPage === page ? 'active' : ''}" data-action="paginate" data-page-value=${page}>${page}</button>`
    }).join("")
}

// increment or decrement page in next and prev buttons
const pageCounter = (count: number) => {
    const searchParams = new URLSearchParams(window.location.search)
    let currentPage = Number(searchParams.get('page'))
    searchParams.set('page', (currentPage + count).toString())
    window.location.search = searchParams.toString()
}
  
// click event for page numbered buttons
paginationNumbersEl.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    const clickedNb = target.closest('button')?.dataset.pageValue;

    if(target.dataset.action = "paginate") {
        const searchParams = new URLSearchParams(window.location.search)
            if(clickedNb){
                searchParams.set('page', clickedNb)
                window.location.search = searchParams.toString()
            }

        getArticlesAndRender()
    }
})

// decrement page with prev btn
prevBtnEl.addEventListener('click', () => {
   pageCounter(-1)
})

// increment page with next btn
nextBtnEl.addEventListener('click', () => {
    pageCounter(+1)
})


