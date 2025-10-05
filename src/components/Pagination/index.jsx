import './index.css';

const Pagination = (attributes) => {
    const {totalPages, currentIndex, onClick} = attributes

    if (!totalPages || totalPages <= 1) {
        return null
    }

    const start = Math.max(1, currentIndex - 3)
    const end = Math.min(totalPages, currentIndex + 3)

    const onClickHandler = (e) => {
        if (onClick) {
            e.preventDefault()
            onClick(parseInt(e.target.dataset.index, 10))
        }
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
        const isCurrent = i === currentIndex
        pages.push(
            <a
                data-index={i}
                className={`utrecht-pagination__page-link${isCurrent ? ' utrecht-pagination__page-link--current' : ''}`}
                href={`#${i}`}
                rel={!isCurrent ? (i < currentIndex ? 'prev' : i > currentIndex ? 'next' : undefined) : undefined}
                aria-current={isCurrent ? 'true' : undefined}
                onClick={onClickHandler}
            >
                {i}
            </a>
        )
    }

    const hasPrev = currentIndex > 1
    const hasNext = currentIndex < totalPages

    return (
        <nav className="utrecht-pagination utrecht-pagination--distanced">
            <span className="utrecht-pagination__before">
                {hasPrev ? (
                    <a
                        data-index={currentIndex - 1}
                        href={`#${currentIndex - 1}`}
                        className="utrecht-pagination__relative-link utrecht-pagination__relative-link--prev"
                        rel="prev"
                        onClick={onClickHandler}
                    >
                        Vorige
                    </a>
                ) : (
                    <span
                        className="utrecht-pagination__relative-link utrecht-pagination__relative-link--disabled utrecht-pagination__relative-link--prev"
                        rel="prev"
                    >
                        Vorige
                    </span>
                )}
            </span>
            <span role="group" className="utrecht-pagination__pages">
                {pages}
            </span>
            <span className="utrecht-pagination__before">
                {hasNext ? (
                    <a
                        data-index={currentIndex + 1}
                        href={`#${currentIndex + 1}`}
                        className="utrecht-pagination__relative-link utrecht-pagination__relative-link--next"
                        rel="next"
                        onClick={onClickHandler}
                    >
                        Volgende
                    </a>
                ) : (
                    <span
                        className="utrecht-pagination__relative-link utrecht-pagination__relative-link--disabled utrecht-pagination__relative-link--next"
                        rel="next">
                        Volgende
                    </span>
                )}
            </span>
        </nav>
    )
};

export default Pagination;
