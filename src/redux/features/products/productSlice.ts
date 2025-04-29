
import { TProductResponse, TQueryParams } from "../../../types/global";
import { baseApi } from "../../api/baseApi";
// import { TQueryParam, TResponseRedux } from "../../../types/global";
// import { Product } from "../../../types/product";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query<TProductResponse, TQueryParams>({
      query: ({ limit = 10, skip = 0 } = {}) => `/products?limit=${limit}&skip=${skip}`,
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, updatedProduct }) => ({
        url: `/products/${id}`,
        method: "PATCH",
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
