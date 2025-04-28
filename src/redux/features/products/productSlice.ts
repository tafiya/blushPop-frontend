
import { baseApi } from "../../api/baseApi";
// import { TQueryParam, TResponseRedux } from "../../../types/global";
// import { Product } from "../../../types/product";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => "/products"
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ _id, updatedProduct }) => ({
        url: `/products/${_id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (_id) => ({
        url: `/products/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
