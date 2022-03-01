/*
    I removed the getUserSettings as I assumed it doesn't have any relevant side-effects which impact the flow.
    I also assume that notifyUser doesn't have any side-effects which impacts the outcome of notifyAdmins
*/
async () => {
    try {
        const state = await loadInitialState()
        const user = await getUser(state, 'email@email.com')

        await setRole(state, user.id, 'ADMIN')

        Promise.all([
            notifyUser(user.id, 'USER_ROLE_UPDATED'),
            notifyAdmins('USER_ROLE_UPDATED'),
        ])
    } catch(err) {
        console.error("Whooops:", err)
    }
}()


