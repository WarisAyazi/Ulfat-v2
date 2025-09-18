function StudentTable({ student }) {
    console.log(student);
    return (
        <div>
            {/* map gives error */}
            {student.map((std) => (
                <table className="px-10 py-6 border-2">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Father Name</td>
                            <td>Gender</td>
                        </tr>
                    </thead>

                    <tbody className="px-10 py-6 border-2">
                        <tr>
                            <td>{std.name}</td>
                            <td>{std.fname}</td>
                            <td>{std.gender}</td>
                        </tr>
                    </tbody>
                </table>
            ))}
        </div>
    );
}

export default StudentTable;
