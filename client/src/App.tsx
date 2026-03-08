import { Route, Switch } from 'wouter';
import Landing from './pages/landing';
import Login from './pages/login';
import Install from './pages/install';
import Docs from './pages/docs';
import Dashboard from './pages/dashboard';
import Agents from './pages/agents';
import AgentDetail from './pages/agent-detail';
import Skills from './pages/skills';
import Privacy from './pages/privacy';
import Deployments from './pages/deployments';
import Playground from './pages/playground';
import NotFound from './pages/not-found';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/install" component={Install} />
      <Route path="/docs" component={Docs} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/agents" component={Agents} />
      <Route path="/agents/:id" component={AgentDetail} />
      <Route path="/skills" component={Skills} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/deployments" component={Deployments} />
      <Route path="/playground" component={Playground} />
      <Route path="/*" component={NotFound} />
    </Switch>
  );
}
