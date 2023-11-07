const { therapists } = require('./data.json')

export default (req, res) => {

    const therapist = therapists.filter(t => t.slug === req.query.slug)


    if (req.method === 'GET') {
        res.status(200).json(therapist)
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).json({ message: `Method ${req.method} is not allowed `})
    }
}