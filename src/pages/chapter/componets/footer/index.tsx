import ChapterFooterCatalog from "./components/catalog";
import ChapterFooterNavBar from "./components/navBar";
import ChapterFooterProgressBar from "./components/progressBar";
import ChapterFooterSettingBar from "./components/settingBar";

const ChapterFooter:React.FC = () => {

  return(
    <>
      <ChapterFooterNavBar />
      <ChapterFooterCatalog />
      <ChapterFooterProgressBar />
      <ChapterFooterSettingBar />
    </>
  )
}

export default ChapterFooter;