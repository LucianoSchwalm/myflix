import useSWR from "swr";
import {
  CategoryType,
  categoryService,
} from "../../../services/categoryService";
import { ListCategorySlide } from "../ListCategorySlide/listCategorySlide";
import { PageSpinner } from "@/components/common/Spinner/spinner";

export const ListCategory = () => {
  const { data, error } = useSWR(
    "/listCategories",
    categoryService.getCategories
  );

  if (error) return error;
  if (!data) {
    return <PageSpinner />;
  }

  return (
    <>
      {data.data?.categories?.map((category: CategoryType) => (
        <ListCategorySlide
          key={category.id}
          categoryId={category.id}
          categoryName={category.name}
        />
      ))}
    </>
  );
};
