import { memo, useMemo } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Charts.scss';
import { useContext } from 'react';
import AppContext from '../../../AppContext';

const Charts = memo(({ favoriteMovies }) => {
    const data = useMemo(() => {
        const genresDict = {};

        favoriteMovies.forEach((movie, i) => {
            const { Genres, Title } = movie;
            const scoreToAdd = 100 - i;

            Genres.forEach(genre => {
                if (!genresDict[genre]) {
                    genresDict[genre] = {
                        score: 0,
                        titles: []
                    };
                }

                const barInfo = genresDict[genre];

                barInfo.score += scoreToAdd;
                barInfo.titles.push(`#${i+1} ${Title}`);
            });
        });

        return Object.keys(genresDict).map(genre => ({
            name: genre,
            score: genresDict[genre].score,
            titles: genresDict[genre].titles
        }));
    }, [favoriteMovies]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
                <div>{payload[0].payload.name}</div>
                {payload[0].payload.titles.map(title =>
                    <div>{title}</div>
                )}
            </div>
          );
        }
      
        return null;
    };

    return (
        <div className='charts'>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <XAxis dataKey="name" angle={-45} textAnchor='end' interval={0} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="score" fill="#9B0404" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
});

export default function ConnectedCharts() {
    const { state } = useContext(AppContext);
    const { favoriteMovies } = state;

    return <Charts favoriteMovies={favoriteMovies} />;
}