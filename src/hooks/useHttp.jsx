
const { REACT_APP_BASE_URL: Baseurl } = process.env

export const useHttp = () => {
    const request = async ({
        url = '',
        method = 'GET',
        body = null,
        headers = {},
        token = false,

    }) => {
        if (token) {
            headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            headers['Content-Type'] = `application/json`;
        }
        let res = await fetch(`${Baseurl}${url}`, {
            method,
            body: body ? JSON.stringify(body) : null,
            headers,
        }).then(res => res.json());

        if (res?.success) {
            return res;
        } else {
            throw new Error(res?.message || 'Something Worng')
        }
    };
    return { request };
}