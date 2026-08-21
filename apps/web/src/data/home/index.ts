import type { HomeLocale, HomePageData } from "../../types/home";
import { enHomeData } from "./en";
import { idHomeData } from "./id";

const homeDataByLocale: Record<HomeLocale, HomePageData> = {
  en: enHomeData,
  id: idHomeData,
};

export function getHomeData(locale: HomeLocale): HomePageData {
  return homeDataByLocale[locale];
}
