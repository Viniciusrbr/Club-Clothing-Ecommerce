import { useParams } from 'react-router'

import CategoryDetails from '../../components/category-details/category-details.component'

import Header from '../../components/header/header.component'

const CategoryDetailsPage = () => {
    const { id } = useParams()

    if (!id) return null

    return (
        <>
            <Header />
            <main id="conteudo">
                <CategoryDetails key={id} categoryId={id} />
            </main>
        </>
    )
}

export default CategoryDetailsPage
