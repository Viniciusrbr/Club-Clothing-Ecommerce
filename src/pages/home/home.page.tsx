import Categories from "../../components/categories/categories.component"
import Header from "../../components/header/header.component"

const HomePage = () => {
  return (
    <>
      <Header />

      <main id="conteudo">
        <Categories />
      </main>
    </>
  )
}

export default HomePage
