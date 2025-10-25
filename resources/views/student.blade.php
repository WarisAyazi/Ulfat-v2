<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <title>Student Information</title>
</head>

<body>
    <div class="max-w-4xl mx-auto my-20 sm:px-6 lg:px-8 justify-center">

        <div class="items-center justify-center">
            <div class="flex items-center justify-evenly">
                <h1 class="font-bold text-center text-3xl justify-center">
                    Hamidullah Ulfat Academic Center
                </h1>
                <button onclick="window.print()">
                    🖨️
                </button>
            </div>
            <div class="items-center">
                <h3 class="font-bold text-center text-xl text-gray-800 justify-center">
                    Bazar Kampany 5th District
                </h3>
            </div>
        </div>


        <div class="relative overflow-x-auto shadow-md my-10">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead class="text-xl text-gray-700 text-center">
                    <tr>
                        <th colspan="4" class="px-6 py-3 bg-gray-50">
                            Student Information Summary
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-b border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                            Id
                        </th>
                        <td class="px-6 py-4">
                            {{ $student->id }}
                        </td>
                        <th class="px-6 py-4 bg-gray-50">
                            Name
                        </th>
                        <td class="px-6 py-4">
                            {{ $student->name }}
                        </td>
                    </tr>

                    <tr class="border-b border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                            Father Name
                        </th>
                        <td class="px-6 py-4">
                            {{ $student->fname }}
                        </td>
                        <th class="px-6 py-4 bg-gray-50">
                            Gender
                        </th>
                        <td class="px-6 py-4">
                            {{ $student->gender }}
                        </td>
                    </tr>

                    <tr class="border-b border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                            Phone Number
                        </th>
                        <td class="px-6 py-4">
                            {{ $student->phone_number }}
                        </td>
                        <th class="px-6 py-4 bg-gray-50">
                            Month/Year
                        </th>
                        <td class="px-6 py-4">
                            {{ $student->created_at }}
                        </td>
                    </tr>

                    <tr>
                        <th colspan="2" class="px-6 py-3 bg-gray-50 text-center">
                            Income
                        </th>

                        <th colspan="2" class="px-6 py-3 bg-gray-50 text-center">
                            Deductions
                        </th>
                    </tr>

                    <tr class="border-b border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                            Father Name
                        </th>
                        <td class="px-6 py-4">
                            {{ $student->fname }}
                        </td>
                        <th class="px-6 py-4 bg-gray-50">
                            Gender
                        </th>
                        <td class="px-6 py-4">
                            {{ $student->gender }}
                        </td>
                    </tr>

                    <tr class="border-b border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50">
                            Phone Number
                        </th>
                        <td class="px-6 py-4">
                            {{ $student->phone_number }}
                        </td>
                        <th class="px-6 py-4 bg-gray-50">
                            Month/Year
                        </th>
                        <td class="px-6 py-4">
                            {{ $student->created_at }}
                        </td>
                    </tr>

                    <tr>
                        <th class="h-10"></th>
                    </tr>

                    <tr class="text-gray-900 font-bold">
                        <td class="px-6 py-3">Paid Fee By</td>
                        <td class="px-6 py-3">Cash</td>
                        <td class="px-6 py-3">Check</td>
                    </tr>

                    <tr class="text-gray-900 font-bold">
                        <td colspan="2" class="px-6 py-3">Paid Fee By: ____________________________</td>
                        <td colspan="2" class="px-6 py-3">Cash: __________________________________</td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</body>

</html>