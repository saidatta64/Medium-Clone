export const Quote = () => {
    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300 p-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg text-center">
                <div className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed">
                    "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
                </div>
                <div className="mt-6 text-lg font-semibold text-gray-700">
                    — Julies Winfield
                </div>
                <div className="text-sm text-gray-500 font-medium">
                    CEO | Acme Corp
                </div>
            </div>
        </div>
    );
};
