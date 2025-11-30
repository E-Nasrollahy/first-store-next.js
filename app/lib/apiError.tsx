export function ApiError(message: string){
  return (
    <p className="font-bold text-xl text-red-500">
      Something went wrong !!! {message}
    </p>
  );
}
