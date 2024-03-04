import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAthleteScores } from '../../../redux/slices/allAthleteScoreSlice';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { CountryFlag, CountryName } from '../../athletePage/countryFlag';


function MedalList() {
    const dispatch = useDispatch();
    const allAthleteScores = useSelector(state => state.allAthleteScore.data || []);
    const [medalSummary, setMedalSummary] = useState({});
    const sortedMedalSummary = Object.entries(medalSummary).sort((a, b) => {
        if (b[1].gold !== a[1].gold) return b[1].gold - a[1].gold;
        if (b[1].silver !== a[1].silver) return b[1].silver - a[1].silver;
        return b[1].bronze - a[1].bronze;
    }).map(([country, medals]) => ({ country, ...medals }));

    // Now, use sortedMedalSummary for rendering

    useEffect(() => {
        dispatch(fetchAllAthleteScores());
    }, [dispatch]);

    useEffect(() => {
        const summary = allAthleteScores.reduce((acc, score) => {
            const { country, medal } = score;
            if (!acc[country]) acc[country] = { gold: 0, silver: 0, bronze: 0, total: 0 };

            if (medal === 1) {
                acc[country].gold++;
                acc[country].total++;
            } else if (medal === 2) {
                acc[country].silver++;
                acc[country].total++;
            } else if (medal === 3) {
                acc[country].bronze++;
                acc[country].total++;
            }
            // หมายเหตุ: เราไม่เพิ่ม acc[country].total หาก medal มีค่าเป็น 0 หรือไม่มีเหรียญ
            return acc;
        }, {});
        setMedalSummary(summary);
    }, [allAthleteScores]);

    return (
        <>
            <div className="w-ful text-center text-Blue-600 font-bold text-4xl p-4">MEDAL SUMMARY </div>
            <div className="w-full flex justify-center">
                <div className="overflow-x-auto w-[65%] border-b-8 border-Blue-600 mb-4 rounded-b-sm  rounded-t-md  ">
                    <table className="min-w-full divide-y divide-gray-200 shadow-md">
                        <thead className="bg-Blue-600 text-white">
                            <tr>
                                <th scope="col" className="w-[35%] py-3 text-left pl-8 font-medium uppercase tracking-wider">
                                    Team
                                </th>
                                <th scope="col" className="w-[16%] py-3 text-center text-sm  font-medium uppercase tracking-wider">
                                    <WorkspacePremiumIcon sx={{ color: '#FFD700' }} />Gold
                                </th>
                                <th scope="col" className="w-[16%] py-3 text-center text-sm font-medium uppercase tracking-wider">
                                    <WorkspacePremiumIcon sx={{ color: '#C0C0C0' }} />Silver
                                </th>
                                <th scope="col" className="w-[16%] py-3 text-center text-sm font-medium uppercase tracking-wider">
                                    <WorkspacePremiumIcon sx={{ color: '#CD7F32' }} />Bronze
                                </th>
                                <th scope="col" className="w-[16%] py-3 text-center font-medium uppercase tracking-wider">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sortedMedalSummary.map(({ country, gold, silver, bronze, total }) => (
                                <tr key={country}>
                                    <td className="flex justify-center items-center py-3 whitespace-nowrap border-b border-Blue-200 font-medium text-gray-900 text-center bg-Blue-100">
                                        <div className='border shadow-shadow-base w-[18%] mx-4 ml-8'>
                                            <CountryFlag countryCode={country} />
                                        </div>
                                        <label className="w-full text-left text-Blue-600 text-lg"><CountryName countryCode={country} /></label>
                                    </td>
                                    <td className="w-[16%] py-3 whitespace-nowrap border-l text-gray-500 text-center">{gold}</td>
                                    <td className="w-[16%] py-3 whitespace-nowrap border-l text-gray-500 text-center">{silver}</td>
                                    <td className="w-[16%] py-3 whitespace-nowrap border-l text-gray-500 text-center">{bronze}</td>
                                    <td className="w-[16%] py-3 whitespace-nowrap border-x text-gray-500 text-center">{total}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

        </>

    );
}

export default MedalList;
{/* <div key={country}>
<h3>{country}</h3>
<p>Gold: {gold}</p>
<p>Silver: {silver}</p>
<p>Bronze: {bronze}</p>
</div> */}