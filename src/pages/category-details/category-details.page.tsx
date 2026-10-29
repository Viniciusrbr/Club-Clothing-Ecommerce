import { useParams } from 'react-router'

import CategoryDetails from '../../components/category-details/category-details.component'

const CategoryDetailsPage = () => {
    const { id } = useParams()

    if (!id) return null

    return (
        <main id="conteudo">
            <CategoryDetails key={id} categoryId={id} />
        </main>
    )
}

export default CategoryDetailsPage
