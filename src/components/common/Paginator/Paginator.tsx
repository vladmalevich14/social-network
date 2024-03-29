import React, {useState} from "react";
import styles from "./Paginator.module.css";
import cn from "classnames"

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanger: (p: number) => void
    portionSize?: number
}

const Paginator = ({totalItemsCount, pageSize, currentPage, onPageChanger, portionSize = 10}: PaginatorPropsType) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / portionSize));
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return <div className={styles.paginator}>
        {portionNumber > 1 && <button
            onClick={() => {
                setPortionNumber(portionNumber - 1)
            }} className={styles.buttonsNextPrev}>←</button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p, i) =>
                <span key={i}
                      className={cn({[styles.selectedPage]: currentPage === p}, styles.pageNumber)}
                      onClick={(e) => {
                          onPageChanger(p)
                      }}
                >{p}</span>)}

        {portionCount > portionNumber && <button onClick={() => {
            setPortionNumber(portionNumber + 1)
        }} className={styles.buttonsNextPrev}>→</button>}
    </div>
}

export default Paginator;