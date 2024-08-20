import "./App.css";
//navbar components import
import NavbarComponent from "./components/NavbarComponent.tsx";
//herosection components import
import ImgWithBlurredCaption from "./components/heroSection.tsx";
//footer components import
import FooterComponent from "./components/FooterComponent.tsx";
import Faq from "./components/FaqComponent.tsx";
//frequent products component import
import FeaturedProductComponent from "./components/ProductCard.tsx";
import ForBuyersSection from "./components/forBuyers.tsx";
import ForSellersSection from "./components/forSellers.tsx";
import StatsComponent from "./components/StatsComponent.tsx";
import QuoteFetcher from "./Terminal Africa/QuoteFetcher.tsx";
import WaitingListComponent from "../src/components/WaitingList.tsx";

export default function App() {
    return (
        <>
            <NavbarComponent />
            <ImgWithBlurredCaption />
            <FeaturedProductComponent />
            <StatsComponent />
            <ForBuyersSection />
            <ForSellersSection />
            <Faq />
            <WaitingListComponent />
            <FooterComponent />
        </>
    );
}
