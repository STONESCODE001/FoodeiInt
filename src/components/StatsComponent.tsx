import { Typography, Card } from "@material-tailwind/react";

interface StatsCardPropsType {
    count: string;
    title: string;
    description: string;
}

function StatsCard({ count, title, description }: StatsCardPropsType) {
    return (
        <Card className="bg-gray-950" shadow={false}>
            <Typography
                className="text-3xl font-black font-kanit text-orange-900"
                color="blue-gray"
            >
                Over {count}
            </Typography>

            <Typography variant="h6" className="mt-1 font-bold text-gray-300">
                {title}
            </Typography>
            <Typography className="text-base max-w-xs font-normal leading-7 !text-gray-500">
                {description}
            </Typography>
            <hr className="mt-2 mb-4 max-w-xs" />
        </Card>
    );
}

const stats = [
    {
        count: "90,000+",
        title: "Shipments Completed 🌍 ",
        description:
            "Delivered by our partner, Terminal Africa, with a growing track record."
    },
    {
        count: "13+",
        title: "Courier Partners 🚚",
        description:
            "Strategic partnerships for hassle-free international shipping."
    },
    {
        count: "30 Million+",
        title: "Naira in Payments Processed 💸",
        description: "Handled securely by our payment provider partner."
    },
    {
        count: "5+ Years",
        title: "of Combined Experience 🛠️",
        description:
            "Our partners bring years of expertise to disrupt the food trade industry."
    }
];

export function StatsComponent() {
    return (
        <section className="lg:py-28 py-10 px-8 container mx-auto bg-gray-900 mt-20 w-auto h-auto">
            <div className="grid gap-10 lg:grid-cols-1 lg:gap-24 xl:grid-cols-2 items-center ">
                <div>
                    <Typography className="font-kanit text-white text-center font-bold text-xl">
                        Why Us.
                    </Typography>
                    <div className="grid lg:grid-cols-2 gap-10 gap-x-20 font-kanit mt-6">
                        {stats.map((props, key) => (
                            <StatsCard key={key} {...props} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default StatsComponent;
